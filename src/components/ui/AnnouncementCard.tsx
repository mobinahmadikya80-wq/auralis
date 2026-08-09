import React from 'react';
import { Megaphone, Calendar, Tag, ArrowRight } from 'lucide-react';

export interface AnnouncementCardProps {
  id?: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  urgent?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  excerpt,
  date,
  category,
  urgent = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group bg-white dark:bg-zinc-900 border rounded-3xl p-6 shadow-sm hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer ${
        urgent ? 'border-red-500/30 bg-red-500/5' : 'border-zinc-200 dark:border-zinc-800'
      } ${className}`}
    >
      <div className="space-y-3">
        {/* Top Header */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span
            className={`px-2.5 py-0.5 rounded font-bold uppercase ${
              urgent
                ? 'bg-red-500 text-white'
                : 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
            }`}
          >
            {urgent ? 'Urgent Notice' : category}
          </span>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>

        {/* Title & Excerpt */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display group-hover:text-cyan-500 transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-end items-center text-xs">
        <span className="text-cyan-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Read Full Announcement <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
