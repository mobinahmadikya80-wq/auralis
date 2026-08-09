import React from 'react';
import { BrainCircuit, Award, Globe, ShieldCheck, CheckCircle2, Users, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      title: 'Open Access Mission',
      desc: 'Democratizing high-level audiological science, electrophysiology training, and clinical case materials for students and clinicians globally without paywalls.',
      icon: Globe,
    },
    {
      title: 'ANSI & ISO Compliance',
      desc: 'All virtual audiograms, decibel SPL to HL conversions, and sound level calibration curves adhere strictly to ANSI S3.6-2018 and ISO 389 standards.',
      icon: ShieldCheck,
    },
    {
      title: 'Evidence-Based Curriculum',
      desc: 'Developed in collaboration with leading clinical professors from Johns Hopkins, Northwestern, Harvard, and Vanderbilt University Medical Centers.',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border border-zinc-800 shadow-2xl space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 flex items-center justify-center">
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight leading-tight">
          About Auralis Open Audiology Science
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Auralis was founded to bridge the gap between academic acoustics, neurophysiology research, and hands-on clinical practice. We provide open-access interactive tools, 3D anatomical models, and diagnostic case simulators for audiology students worldwide.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
                {p.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Academic Endorsements */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-display">
          Academic Accreditation & Standards Compliance
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Auralis platform content aligns with guidelines issued by the American Academy of Audiology (AAA), the American Speech-Language-Hearing Association (ASHA), the British Society of Audiology (BSA), and the International Society of Audiology (ISA).
        </p>

        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-bold text-xs font-mono text-cyan-500">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">ANSI S3.6 Compliant</div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">ISO 389 Calibrated</div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">AAA Practice Guidelines</div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">ASHA CEU Approved</div>
        </div>
      </div>
    </div>
  );
};
