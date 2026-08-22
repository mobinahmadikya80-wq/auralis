import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AiTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'tutor',
      text: "Welcome to Auralis AI Tutor! I am your client-side AI clinical assistant specialized in Audiological Science, Psychoacoustics, Electrophysiology, and Vestibular Diagnostics. How can I assist your study or clinical preparation today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "Explain ABR Wave V latency shift in acoustic neuroma",
    "How to differentiate Otosclerosis Schwartze sign from Tympanosclerosis?",
    "Explain the Count-the-Dots Speech Intelligibility Index (SII) method",
    "What is the difference between VRA and CPA in pediatric audiology?",
    "Calculate minimum masking level for a 60 dB Air-Bone gap example"
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const env = (import.meta as unknown as { env?: { VITE_OPENAI_API_KEY?: string; VITE_GEMINI_API_KEY?: string } }).env;
      const openaiKey = env?.VITE_OPENAI_API_KEY;
      const geminiKey = env?.VITE_GEMINI_API_KEY;

      if (openaiKey) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are Auralis AI Tutor, a senior professor and clinical audiologist. Provide clear, evidence-based explanations.',
              },
              { role: 'user', content: query },
            ],
          }),
        });

        if (!res.ok) {
          throw new Error(`OpenAI API error: ${res.status}`);
        }

        const data = await res.json();
        const replyText: string = data.choices?.[0]?.message?.content || 'No response text generated.';
        const tutorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, tutorMsg]);
        setIsLoading(false);
        return;
      }

      if (geminiKey) {
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are Auralis AI Tutor, a senior professor and clinical audiologist. Provide a clear, evidence-based explanation for: ${query}`
                }
              ]
            }
          ]
        });

        const replyText = response.text || 'No response text generated.';
        const tutorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, tutorMsg]);
        setIsLoading(false);
        return;
      }
    } catch {
      // Fallback to client-side clinical engine
    }

    // Client-side clinical audiology intelligence engine
    let replyText = `Clinical Explanation regarding "${query}":\n\n`;

    const q = query.toLowerCase();
    if (q.includes('abr') || q.includes('wave') || q.includes('neuroma')) {
      replyText += `**ABR Wave V & Retrocochlear Evaluation:**\n- Wave V originates in the inferior colliculus (midbrain).\n- Prolongation of Wave V absolute latency (>5.7 ms at 70 dB nHL click) or interaural Wave V delay (IT5 > 0.3 ms) indicates slowed neural conduction, strongly suspicious for retrocochlear pathology such as Vestibular Schwannoma (Acoustic Neuroma).\n- Prolonged I-V interpeak latency (>4.0 ms) further supports retrocochlear lesion identification.`;
    } else if (q.includes('otosclerosis') || q.includes('schwartze')) {
      replyText += `**Otosclerosis vs Tympanosclerosis:**\n- **Otosclerosis**: Spongy bone turnover at the stapedio-vestibular joint causing stapes fixation. Presents with Type As (shallow) tympanograms, conductively elevated thresholds, Schwartze sign (red vascular blush behind TM), and Carhart Notch at 2 kHz.\n- **Tympanosclerosis**: Hyalinization and calcification of the tympanic membrane/middle ear mucosal tissue from chronic otitis media; usually asymptomatic unless thick plaque stiffens TM mobility.`;
    } else if (q.includes('sii') || q.includes('speech') || q.includes('dots')) {
      replyText += `**Speech Intelligibility Index (SII) Method:**\n- The SII quantifies the proportion of speech signal audible to a listener (0.0 to 1.0, or 0% to 100%).\n- In Mueller & Killion's Count-the-Dots method, 100 dots are distributed across frequencies (500 to 4000 Hz) representing speech power density. Dots sitting above the patient's audiometric threshold line are audible and summed to yield the SII percentage.`;
    } else if (q.includes('vra') || q.includes('cpa') || q.includes('pediatric')) {
      replyText += `**Pediatric Audiology Behavioral Testing:**\n- **Visual Reinforcement Audiometry (VRA)**: Recommended for infants aged 6 to 24 months. Uses animated lighted toys as visual reinforcement when the child turns toward sound stimuli.\n- **Conditioned Play Audiometry (CPA)**: Recommended for toddlers aged 2.5 to 5 years. Conditions the child to perform a play task (e.g., dropping a peg in a bucket) upon hearing a sound stimulus.`;
    } else if (q.includes('masking') || q.includes('gap')) {
      replyText += `**Clinical Masking Rules (ANSI S3.6):**\n- Masking is required for Air Conduction when AC(test ear) - BC(non-test ear) >= Interaural Attenuation (40 dB for supra-aural headphones, 60 dB for insert earphones).\n- Masking is ALWAYS required for Bone Conduction whenever an Air-Bone Gap in the test ear exceeds 10 dB.`;
    } else {
      replyText += `**Core Audiological Clinical Principles:**\n1. **Diagnostic Integration**: Always correlate behavioral pure-tone audiograms with objective battery tests (Tympanometry Type A/B/C, Acoustic Reflexes, DPOAEs, ABR).\n2. **Acoustic Standards**: RETSPL values convert dB HL thresholds to dB SPL across frequencies (e.g. 1000 Hz 0 dB HL = 7.5 dB SPL).\n3. **Patient Counseling**: Verify amplification using Real-Ear Measurement (REM) probe microphone systems to ensure speech audibility and comfortable output levels.`;
    }

    setTimeout(() => {
      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, tutorMsg]);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-zinc-900 rounded-3xl p-6 sm:p-8 border border-purple-800/60 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>دستیار هوشمند شنوایی‌شناسی</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
          دستیار مطالعه بالینی هوشمند اورالیس
        </h2>
        <p className="text-xs sm:text-sm text-purple-200 max-w-2xl">
          سوالاتت رو درباره الکتروفیزیولوژی، رفلکس آکوستیک، پروتکل‌های شنوایی‌شناسی کودکان، نیستاگموس دهلیزی یا فرمول‌های تنظیم سمعک بپرس.
        </p>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex flex-wrap gap-2 text-xs">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 text-zinc-700 dark:text-zinc-300 transition-colors font-medium text-left"
          >
            💡 {qp}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col h-[520px]">
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-cyan-500 text-zinc-950' : 'bg-purple-600 text-white'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm space-y-1 ${
                m.sender === 'user'
                  ? 'bg-cyan-500 text-zinc-950 font-medium'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 whitespace-pre-wrap leading-relaxed'
              }`}>
                <div dir="auto">{m.text}</div>
                <div className="text-[10px] opacity-60 text-right mt-1 font-mono">{m.timestamp}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-zinc-400 text-xs py-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
              <span>در حال بررسی پایگاه دانش شنوایی‌شناسی...</span>
            </div>
          )}
        </div>

        {/* Query Input Box */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="یک سوال بالینی درباره شنوایی‌شناسی بپرس..."
            className="flex-1 px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuery.trim()}
            className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
