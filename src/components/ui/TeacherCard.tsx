import React from 'react';
import { Award, Mail, Building2, BookOpen, ExternalLink } from 'lucide-react';

export interface TeacherCardProps {
  name: string;
  title: string;
  university: string;
  specialty: string;
  publicationsCount?: number;
  avatarUrl?: string;
  email?: string;
  onContactClick?: () => void;
  className?: string;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  title,
  university,
  specialty,
  publicationsCount = 42,
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  email,
  onContactClick,
  className = '',
}) => {
  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 ${className}`}>
      <div className="space-y-4">
        {/* Avatar & Basic Info */}
        <div className="flex items-start gap-4">
          <img
            src={avatarUrl}
            alt={name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500/30 shrink-0"
          />

          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display leading-tight">
              {name}
            </h3>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{title}</p>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{university}</span>
            </div>
          </div>
        </div>

        {/* Specialty Pill */}
        <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Primary Field</span>
          <p className="font-bold text-zinc-800 dark:text-zinc-200">{specialty}</p>
        </div>
      </div>

      {/* Footer Stats & Contact */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-zinc-500 font-mono">
          <Award className="w-4 h-4 text-amber-500" />
          <span>{publicationsCount} Publications</span>
        </div>

        <button
          onClick={onContactClick}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center gap-1.5 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact</span>
        </button>
      </div>
    </div>
  );
};
