/**
 * Auralis AI Proxy — Cloudflare Worker
 *
 * Keeps the OpenAI API key server-side. The frontend only talks to this Worker.
 *
 * SETUP:
 * 1. Cloudflare Dashboard → Workers & Pages → Create → Create Worker
 * 2. Paste this entire file as the Worker code
 * 3. Settings → Variables and Secrets → Add secret:
 *      OPENAI_API_KEY = (your OpenAI key, sk-proj-...)
 * 4. Deploy. Copy the Worker URL, e.g.:
 *      https://auralis-ai-proxy.YOUR_SUBDOMAIN.workers.dev
 * 5. In the GitHub repo → Settings → Secrets and variables → Actions
 *      Add secret: VITE_AI_PROXY_URL = https://auralis-ai-proxy.YOUR_SUBDOMAIN.workers.dev/chat
 * 6. Re-run the CI/CD workflow (or push a small commit) so the frontend is rebuilt
 *    with the proxy URL.
 *
 * Optional: restrict CORS to your GitHub Pages origin only by editing the
 * allowedOrigins array below.
 */

const SYSTEM_PROMPT = `You are Auralis AI Tutor, a senior professor and clinical audiologist specializing in Audiological Science, Psychoacoustics, Electrophysiology (ABR, ASSR, OAEs), Vestibular Diagnostics (VNG, cVEMP/oVEMP, vHIT), Pediatric Audiology, Hearing Aid fitting (WDRC, REM), and related clinical topics.

Answer in the same language the student uses (Persian/Farsi or English). Provide clear, evidence-based, educational explanations suitable for Au.D. students and clinicians. Be concise but complete. Use markdown structure when it helps readability. Do not invent clinical guidelines; prefer established standards (ANSI, ASHA, NIOSH, etc.).`;

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

    if (!env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not configured on the Worker' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();
      const incoming = Array.isArray(body.messages) ? body.messages : [];

      // Build OpenAI messages: system + history (user/assistant only)
      const openaiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...incoming
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .map((m) => ({ role: m.role, content: m.content.slice(0, 8000) }))
          .slice(-20), // keep last 20 turns for context + cost control
      ];

      if (openaiMessages.length < 2) {
        return new Response(JSON.stringify({ error: 'No user message provided' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: openaiMessages,
          temperature: 0.45,
          max_tokens: 1600,
        }),
      });

      if (!openaiRes.ok) {
        const errText = await openaiRes.text();
        return new Response(
          JSON.stringify({ error: `OpenAI API error ${openaiRes.status}`, details: errText.slice(0, 500) }),
          {
            status: openaiRes.status >= 500 ? 502 : openaiRes.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        );
      }

      const data = await openaiRes.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || 'پاسخی تولید نشد.';

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
