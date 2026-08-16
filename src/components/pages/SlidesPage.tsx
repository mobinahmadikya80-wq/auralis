import React from 'react';
import { Presentation, Download, Clock } from 'lucide-react';
import { EDUCATIONAL_RESOURCES } from '../../data/resources';

export const SlidesPage: React.FC = () => {
  const slides = EDUCATIONAL_RESOURCES.filter((r) => r.type === 'slides');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Presentation className="w-3.5 h-3.5" />
          <span>مجموعه اسلایدهای درسی</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          اسلایدهای درسی و فایل‌های پاورپوینت شنوایی‌شناسی
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          اسلایدهای ساختاریافته برای تدریس دانشگاهی، گروه‌های مطالعاتی دانشجویی و ارائه‌های سمینار بالینی را دانلود کنید.
        </p>
      </div>

      {/* Grid */}
      {slides.length === 0 ? (
        <div className="text-center text-sm text-zinc-500 py-12">
          هنوز اسلایدی منتشر نشده. از پنل ادمین اضافه کن (Resource Hub، نوع: slides).
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                    {s.topic}
                  </span>
                  {s.slidesCount ? (
                    <span>{s.slidesCount} اسلاید</span>
                  ) : (
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.readTimeOrDuration}</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display auto-dir">
                  {s.title}
                </h3>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed auto-dir">
                  {s.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="text-zinc-500 auto-dir">نویسنده: {s.author}</span>
                {s.downloadUrl ? (
                  <a
                    href={s.downloadUrl}
                    download
                    className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500 hover:text-zinc-950 font-bold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دریافت اسلاید</span>
                  </a>
                ) : (
                  <span className="text-zinc-400 italic">هنوز فایلی ثبت نشده</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
