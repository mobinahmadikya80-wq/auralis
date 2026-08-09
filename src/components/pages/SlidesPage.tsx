import React from 'react';
import { Presentation, Download, FileText, Clock, ExternalLink } from 'lucide-react';

export const SlidesPage: React.FC = () => {
  const slides = [
    {
      title: 'Psychoacoustics & Sound Perception: Pitch, Loudness, and Masking Patterns',
      slidesCount: 42,
      topic: 'Psychoacoustics',
      author: 'Dr. Sarah Jenkins',
      desc: 'Lecture presentation covering Phon curves, Sone scale, Stevens Power Law, critical bands (ERB), and temporal integration in normal and impaired ears.',
    },
    {
      title: 'Cochlear Implant Speech Processing Strategies & Telemetry Calibration',
      slidesCount: 56,
      topic: 'Cochlear Implants',
      author: 'Prof. Marcus Vance',
      desc: 'Slide deck exploring Continuous Interleaved Sampling (CIS), Advanced Combination Encoders (ACE), electrode impedance telemetry, and ECAP neural response telemetry.',
    },
    {
      title: 'Vestibular Anatomy & Video Head Impulse Test (vHIT) Interpretation',
      slidesCount: 38,
      topic: 'Vestibular Science',
      author: 'Dr. David Chen',
      desc: 'High-resolution diagram slides analyzing semicircular canal mechanics, vestibulo-ocular reflex (VOR) gain, overt/covert saccades, and canal paresis calculation.',
    },
    {
      title: 'Auditory Processing Disorder (APD) Battery: Diagnostic Test Interpretations',
      slidesCount: 34,
      topic: 'Auditory Processing',
      author: 'Dr. Elena Rostova',
      desc: 'Slide breakdown of Dichotic Digits Test, Frequency Pattern Test, Duration Pattern Test, and Masking Level Difference (MLD) in pediatric populations.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Presentation className="w-3.5 h-3.5" />
          <span>Lecture Presentation Decks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          Audiology Lecture Slides & PowerPoint Decks
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Download structured slide decks for university teaching, student study groups, and clinical seminar presentations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                  {s.topic}
                </span>
                <span>{s.slidesCount} Slides Deck</span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
                {s.title}
              </h3>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <span className="text-zinc-500">By {s.author}</span>
              <button
                onClick={() => alert(`Downloading Slide Deck: ${s.title}`)}
                className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500 hover:text-zinc-950 font-bold transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Slides</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
