/**
 * Auralis AI Proxy — Cloudflare Worker
 *
 * Keeps the Gemini API key server-side. The frontend only talks to this Worker.
 *
 * SETUP:
 * 1. Get a Gemini API key at https://aistudio.google.com/apikey
 * 2. Cloudflare Dashboard → Workers & Pages → your existing "auralis-ai-proxy" Worker
 *      (or Create → Create Worker, if you don't have one yet)
 * 3. Paste this entire file as the Worker code (replacing whatever is there)
 * 4. Settings → Variables and Secrets → Add secret:
 *      GEMINI_API_KEY = (your Gemini key, AIza...)
 *    (You can delete the old OPENAI_API_KEY secret, it's no longer used.)
 * 5. Deploy. The Worker URL stays the same as before, e.g.:
 *      https://auralis-ai-proxy.YOUR_SUBDOMAIN.workers.dev
 *    Your GitHub repo's VITE_AI_PROXY_URL secret does NOT need to change.
 *
 * Optional: restrict CORS to your GitHub Pages origin only by editing the
 * allowedOrigins array below.
 */

const SYSTEM_PROMPT = `You are Auralis AI Tutor, a senior professor and clinical audiologist specializing in Audiological Science, Psychoacoustics, Electrophysiology (ABR, ASSR, OAEs), Vestibular Diagnostics (VNG, cVEMP/oVEMP, vHIT), Pediatric Audiology, Hearing Aid fitting (WDRC, REM), and related clinical topics.

Answer in the same language the student uses (Persian/Farsi or English). Provide clear, evidence-based, educational explanations suitable for Au.D. students and clinicians. Be concise but complete. Use markdown structure when it helps readability. Do not invent clinical guidelines; prefer established standards (ANSI, ASHA, NIOSH, etc.).`;

const GEMINI_MODEL = 'gemini-2.5-flash';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';

    // Allow common static hosts + localhost for development
    const allowedOrigins = [
      'https://mobinahmadikya80-wq.github.io',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ];
    const allowOrigin = allowedOrigins.includes(origin) ? origin : (allowedOrigins[0] || '*');

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only POST /chat
    if (request.method !== 'POST' || !url.pathname.endsWith('/chat')) {
      return new Response(JSON.stringify({ error: 'Not found. Use POST /chat' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the Worker' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();
      const incoming = Array.isArray(body.messages) ? body.messages : [];

      // Build Gemini "contents": alternating user/model turns, no system role
      // (Gemini takes the system instruction separately via systemInstruction).
      const contents = incoming
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content.slice(0, 8000) }],
        }))
        .slice(-20); // keep last 20 turns for context + cost control

      if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
        return new Response(JSON.stringify({ error: 'No user message provided' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { role: 'system', parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: {
              temperature: 0.45,
              maxOutputTokens: 1600,
            },
          }),
        },
      );

      if (!geminiRes.ok) {
        const errText = await geminiRes.text();
        return new Response(
          JSON.stringify({ error: `Gemini API error ${geminiRes.status}`, details: errText.slice(0, 500) }),
          {
            status: geminiRes.status >= 500 ? 502 : geminiRes.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        );
      }

      const data = await geminiRes.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim() ||
        'پاسخی تولید نشد.';

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err?.message || 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

