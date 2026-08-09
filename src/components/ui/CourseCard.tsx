import React from 'react';
import { BookOpen, Clock, Award, Users, Star, ArrowRight } from 'lucide-react';

export interface CourseCardProps {
  id?: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  modulesCount: number;
  instructor: string;
  rating?: number;
  enrolledCount?: number;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  level,
  duration,
  modulesCount,
  instructor,
  rating = 4.9,
  enrolledCount = 1420,
  imageUrl,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${className}`}
    >
      <div className="space-y-4">
        {/* Cover / Image Header */}
        <div className="relative h-44 w-full bg-gradient-to-tr from-zinc-900 to-indigo-950 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <BookOpen className="w-12 h-12 text-cyan-400 opacity-60" />
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              {level}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-zinc-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-amber-400" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-display group-hover:text-cyan-500 transition-colors leading-snug">
            {title}
          </h3>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
              <span>{modulesCount} Modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-between text-xs">
        <span className="text-zinc-600 dark:text-zinc-400 font-medium">By {instructor}</span>
        <span className="text-cyan-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Enroll Now <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
