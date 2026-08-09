import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatItem {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  subtext?: string;
}

export interface StatisticsProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const Statistics: React.FC<StatisticsProps> = ({
  stats,
  columns = 4,
  className = '',
}) => {
  const colStyles = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colStyles[columns]} gap-4 ${className}`}>
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </span>
              {Icon && (
                <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display tracking-tight">
                  {stat.value}
                </span>

                {stat.change && (
                  <span
                    className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                      stat.changeType === 'positive'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : stat.changeType === 'negative'
                        ? 'bg-red-500/10 text-red-500'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>

              {stat.subtext && (
                <p className="text-[11px] text-zinc-400 font-mono">
                  {stat.subtext}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
