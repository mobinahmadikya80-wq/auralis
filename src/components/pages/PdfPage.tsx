import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck, FileCheck, BookOpen } from 'lucide-react';

export const PdfPage: React.FC = () => {
  const pdfManuals = [
    {
      title: 'ANSI S3.6-2018 Specification for Audiometers & Reference Equivalent Threshold SPL (RETSPL)',
      pages: 48,
      size: '4.2 MB',
      author: 'American National Standards Institute (ANSI)',
      desc: 'Official technical standard defining transducer calibration tolerances, reference sound pressure levels (0 dB HL equivalent SPL in dB), and harmonic distortion limits for clinical audiometers.',
      link: '#'
    },
    {
      title: 'BSA Clinical Guidance: Pure-Tone Air & Bone Conduction Threshold Testing with Masking',
      pages: 36,
      size: '2.8 MB',
      author: 'British Society of Audiology (BSA)',
      desc: 'Step-by-step clinical practice guidelines for masking rule selection, cross-hearing calculation, shadow curve avoidance, and bone conduction transducer placement.',
      link: '#'
    },
    {
      title: 'Joint Committee on Infant Hearing (JCIH) 2019 Position Statement: Early Hearing Detection',
      pages: 62,
      size: '5.1 MB',
      author: 'JCIH Working Group',
      desc: 'Comprehensive 1-3-6 diagnostic guidelines: Screening by 1 month, Diagnostic evaluation by 3 months, and Early intervention placement by 6 months of age.',
      link: '#'
    },
    {
      title: 'AAA Clinical Practice Guideline: Adult Hearing Assessment & Fitting Protocol',
      pages: 44,
      size: '3.6 MB',
      author: 'American Academy of Audiology (AAA)',
      desc: 'Evidence-based clinical guidelines covering otoscopy, pure-tone audiometry, speech recognition thresholds (SRT), word recognition scores (WRS), and REM verification.',
      link: '#'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <FileText className="w-3.5 h-3.5" />
          <span>Clinical PDF Manuals & Guidelines</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          Audiological Standards & Printable Clinical PDFs
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Download certified ANSI/ISO specifications, BSA masking guidelines, and clinical practice papers for offline study and clinical reference.
        </p>
      </div>

      {/* Manuals List */}
      <div className="space-y-4">
        {pdfManuals.map((pdf, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-cyan-500/40 transition-all"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-bold border border-red-500/20">PDF</span>
                <span>{pdf.pages} Pages</span>
                <span>•</span>
                <span>{pdf.size}</span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
                {pdf.title}
              </h3>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {pdf.desc}
              </p>

              <div className="text-[11px] text-zinc-400 font-semibold">
                Issuer: {pdf.author}
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading PDF: ${pdf.title}`)}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shrink-0 shadow-md shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
