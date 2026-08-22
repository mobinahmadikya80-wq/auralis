import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

interface EmptyStatePageProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export const EmptyStatePage: React.FC<EmptyStatePageProps> = ({
  title = "منبعی پیدا نشد",
  description = "هیچ جزوه، کتاب یا ابزاری با این جست‌وجو مطابقت نداشت. کلیدواژه‌ها را کلی‌تر کن.",
  onReset
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm text-center space-y-4 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
        {title}
      </h3>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs inline-flex items-center gap-2 shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>پاک‌کردن جست‌وجو و فیلترها</span>
        </button>
      )}
    </div>
  );
};
