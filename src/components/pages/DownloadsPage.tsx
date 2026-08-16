import React from 'react';
import { Download, FileSpreadsheet, Music, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getDownloads } from '../../content/loader';

// Maps the "iconName" string stored in content frontmatter to an actual icon component.
// Add new entries here if an editor picks an icon name that isn't listed yet.
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FileSpreadsheet,
  Music,
  FileText,
};

export const DownloadsPage: React.FC = () => {
  const downloadables = getDownloads().map((d) => ({ ...d, icon: ICONS[d.iconName] || FileText }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Download className="w-3.5 h-3.5" />
          <span>آرشیو دانلود نرم‌افزار و منابع بالینی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          ابزارهای آدیومتری، فایل‌های صوتی و صفحات اکسل
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          صفحات اکسل رایگان SII، فایل‌های صوتی کالیبره‌شده، جداول مرجع RETSPL و قالب‌های مستندسازی پذیرش بالینی، همه قابل دانلود.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadables.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="px-2 py-0.5 rounded font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    {item.extension}
                  </span>
                  <span>{item.size}</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-cyan-500 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 dir="auto" className="text-base font-bold text-zinc-900 dark:text-white font-display leading-snug">
                    {item.name}
                  </h3>
                </div>

                <p dir="auto" className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs">
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> بررسی‌شده از نظر ویروس
                </span>
                <button
                  onClick={() => window.open(item.fileUrl || '#', '_blank', 'noopener,noreferrer')}
                  disabled={!item.fileUrl}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>دانلود فایل</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
