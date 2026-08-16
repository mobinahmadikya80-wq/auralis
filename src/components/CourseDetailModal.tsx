import React, { useState } from 'react';
import { X, Video, Presentation, FileText, Download, Clock } from 'lucide-react';
import { CourseFrontmatter, CourseMaterialItem } from '../content/loader';

interface CourseDetailModalProps {
  course: CourseFrontmatter & { id: string };
  onClose: () => void;
}

type Tab = 'videos' | 'slides' | 'notes';

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'videos', label: 'ویدیوها', icon: Video },
  { id: 'slides', label: 'اسلایدها', icon: Presentation },
  { id: 'notes', label: 'جزوات', icon: FileText },
];

const MaterialRow: React.FC<{ item: CourseMaterialItem; index: number }> = ({ item, index }) => (
  <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-7 h-7 shrink-0 rounded-lg bg-cyan-500/10 text-cyan-500 text-xs font-bold flex items-center justify-center">
        {index + 1}
      </span>
      <span dir="auto" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
        {item.title}
      </span>
    </div>
    {item.fileUrl ? (
      <a
        href={item.fileUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
      >
        <Download className="w-3.5 h-3.5" />
        <span>دانلود</span>
      </a>
    ) : (
      <span className="shrink-0 text-[11px] text-zinc-400 italic">فایلی ثبت نشده</span>
    )}
  </div>
);

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const [tab, setTab] = useState<Tab>('videos');

  const itemsByTab: Record<Tab, CourseMaterialItem[]> = {
    videos: course.videos || [],
    slides: course.slides || [],
    notes: course.notes || [],
  };

  const activeItems = itemsByTab[tab];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              {course.code} • {course.category}
            </span>
            <h2 dir="auto" className="text-lg font-bold text-zinc-900 dark:text-white font-display truncate">
              {course.title}
            </h2>
            <div className="text-xs text-zinc-500 flex items-center gap-3">
              <span>استاد: <strong dir="auto" className="text-zinc-700 dark:text-zinc-300">{course.instructor}</strong></span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            const count = itemsByTab[t.id].length;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  tab === t.id
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 space-y-3 overflow-y-auto">
          {activeItems.length === 0 ? (
            <div className="text-center text-sm text-zinc-400 py-10">
              هنوز آیتمی به این بخش اضافه نشده. از پنل ادمین اضافه کن (Courses → این درس → {tab === 'videos' ? 'Videos' : tab === 'slides' ? 'Slides' : 'Notes'}).
            </div>
          ) : (
            activeItems.map((item, i) => <MaterialRow key={i} item={item} index={i} />)
          )}
        </div>
      </div>
    </div>
  );
};
