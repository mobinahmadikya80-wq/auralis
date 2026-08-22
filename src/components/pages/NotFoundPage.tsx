import React from 'react';
import { Ear, Home, ArrowLeft, Search, Sparkles } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 shadow-2xl">
          <Ear className="w-12 h-12" />
        </div>
        <div className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-red-500 text-white font-mono text-xs font-bold shadow-lg">
          404
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          فرکانس مورد نظر پیدا نشد
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          منبع یا صفحه‌ی درخواستی در پایگاه‌داده ما پیدا نشد. ممکنه جابه‌جا یا آرشیو شده باشه.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Home className="w-4 h-4" />
          <span>بازگشت به صفحه اصلی</span>
        </button>
      </div>
    </div>
  );
};
