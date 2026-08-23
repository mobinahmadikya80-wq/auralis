import React, { useMemo, useState } from 'react';
import { Upload, Video, Presentation, FileText, Download, Filter } from 'lucide-react';
import { getRecentUploads, RecentUploadType } from '../../content/loader';

const TYPE_FILTERS: { id: 'all' | RecentUploadType; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'video', label: 'ویدیو' },
  { id: 'slides', label: 'اسلاید' },
  { id: 'note', label: 'جزوه' },
];

const typeIcon: Record<RecentUploadType, React.ComponentType<{ className?: string }>> = {
  video: Video,
  slides: Presentation,
  note: FileText,
};

const typeColor: Record<RecentUploadType, string> = {
  video: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  slides: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  note: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
};

export const RecentUploadsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | RecentUploadType>('all');
  const all = useMemo(() => getRecentUploads(80), []);
  const items = filter === 'all' ? all : all.filter((i) => i.type === filter);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Upload className="w-3.5 h-3.5" />
          <span>آخرین فایل‌های اضافه‌شده به دروس</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          فایل‌های اخیراً آپلود‌شده
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          ویدیو، اسلاید و جزوه‌هایی که به دروس اضافه شده‌اند — مثلاً «ویدیو جلسه فلان از درس فلان اضافه شده».
        </p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === f.id
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              {f.id === 'all' && <Filter className="w-3.5 h-3.5" />}
              <span>{f.label}</span>
              <span className="opacity-60">
                ({f.id === 'all' ? all.length : all.filter((i) => i.type === f.id).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center text-sm text-zinc-400 py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            هنوز فایلی ثبت نشده است.
          </div>
        ) : (
          items.map((item) => {
            const Icon = typeIcon[item.type];
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center ${typeColor[item.type]}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <div className="min-w-0 space-y-1">
                    <p dir="auto" className="text-sm font-bold text-zinc-900 dark:text-white">
                      {item.message}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                      <span className={`px-2 py-0.5 rounded-md font-bold border ${typeColor[item.type]}`}>
                        {item.typeLabel}
                      </span>
                      <span className="font-mono">{item.courseCode}</span>
                      <span dir="auto" className="truncate max-w-[16rem]">
                        {item.courseTitle}
                      </span>
                    </div>
                  </div>
                </div>

                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود / مشاهده</span>
                  </a>
                ) : (
                  <span className="shrink-0 text-[11px] text-zinc-400 italic">فایلی ثبت نشده</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
