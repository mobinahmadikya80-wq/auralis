import React from 'react';
import { Microscope, ExternalLink, FileText, Calendar, Award } from 'lucide-react';
import { getResearchPapers } from '../../content/loader';

export const ResearchPage: React.FC = () => {
  const papers = getResearchPapers();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Microscope className="w-3.5 h-3.5" />
          <span>علم بالینی داوری‌شده</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          پژوهش‌ها و انتشارات علمی شنوایی‌شناسی
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          مطالعات داوری‌شده اخیر، کارآزمایی‌های بالینی الکتروفیزیولوژی و پروتکل‌های پایش اتوتوکسیسیته نمایه‌شده در PubMed را مرور کنید.
        </p>
      </div>

      {/* Papers */}
      <div className="space-y-6">
        {papers.map((p, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 font-mono">
              <span dir="auto" className="text-cyan-500 font-bold">{p.journal}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-300 font-semibold">{p.citations} استناد</span>
              </div>
            </div>

            <div>
              <h3 dir="auto" className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-display leading-snug">
                {p.title}
              </h3>
              <p dir="auto" className="text-xs text-zinc-400 font-semibold mt-1">
                نویسندگان: {p.authors}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <span className="text-[11px] font-bold text-cyan-500 uppercase tracking-wider">خلاصه چکیده:</span>
              <p dir="auto" className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {p.abstract}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="font-mono text-zinc-400">شناسه DOI: {p.doi}</span>
              <a
                href={`https://doi.org/${p.doi}`}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-500 font-bold hover:underline flex items-center gap-1"
              >
                <span>مطالعه کامل مقاله</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
