import React from 'react';
import { Bell, Calendar, ChevronLeft, Sparkles, Megaphone, ShieldCheck } from 'lucide-react';
import { getAnnouncements } from '../../content/loader';

export const AnnouncementsPage: React.FC = () => {
  const news = getAnnouncements();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Megaphone className="w-3.5 h-3.5" />
          <span>اطلاعیه‌ها و اخبار</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          اطلاعیه‌های بالینی و به‌روزرسانی‌های پلتفرم
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          از آخرین اخبار شنوایی‌شناسی، انتشارات پلتفرم، برنامه همایش‌ها و کارگاه‌های آموزش مداوم (CEU) باخبر شوید.
        </p>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                {item.badge}
              </span>
              <span className="text-zinc-400 flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
              {item.title}
            </h3>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.summary}
            </p>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-zinc-400 font-mono">{item.readTime}</span>
              <button
                onClick={() => alert(`Reading news: ${item.title}`)}
                className="text-cyan-500 font-bold hover:underline flex items-center gap-1"
              >
                <span>مطالعه کامل اطلاعیه</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
