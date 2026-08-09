import React from 'react';

export interface TimelineEvent {
  id: string;
  dateOrStep: string;
  title: string;
  description: string;
  status?: 'completed' | 'current' | 'upcoming';
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, className = '' }) => {
  return (
    <div className={`relative space-y-6 before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800 ${className}`}>
      {events.map((event, idx) => {
        const Icon = event.icon;
        const isCurrent = event.status === 'current';
        const isCompleted = event.status === 'completed';

        return (
          <div key={event.id || idx} className="relative flex items-start gap-4 sm:gap-6 pl-2">
            {/* Timeline Marker Dot */}
            <div
              className={`relative z-10 p-2 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all ${
                isCurrent
                  ? 'bg-cyan-500 text-zinc-950 border-cyan-400 shadow-lg shadow-cyan-500/30 ring-4 ring-cyan-500/10'
                  : isCompleted
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border-zinc-300 dark:border-zinc-700'
              }`}
            >
              {Icon ? (
                <Icon className="w-4 h-4" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-current" />
              )}
            </div>

            {/* Event Details Card */}
            <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">{event.dateOrStep}</span>
                {event.badge && (
                  <span className="px-2 py-0.5 rounded font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px]">
                    {event.badge}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white font-display">
                {event.title}
              </h4>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
