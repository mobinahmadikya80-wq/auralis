import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-cyan-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-500/5',
    error: 'border-red-500/30 bg-red-500/5',
    info: 'border-cyan-500/30 bg-cyan-500/5',
    warning: 'border-amber-500/30 bg-amber-500/5',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-2xl border bg-white dark:bg-zinc-900 shadow-xl max-w-sm w-full animate-slideInRight ${borders[type]}`}
    >
      <div className="shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 space-y-1">
        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white font-display">
          {title}
        </h4>
        {message && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {message}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
