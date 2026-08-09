import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const LoadingStatePage: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse p-4">
      <div className="h-32 bg-zinc-200 dark:bg-zinc-900 rounded-3xl" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-zinc-200 dark:bg-zinc-900 rounded-2xl p-6 space-y-4">
            <div className="h-4 w-1/3 bg-zinc-300 dark:bg-zinc-800 rounded" />
            <div className="h-6 w-3/4 bg-zinc-300 dark:bg-zinc-800 rounded" />
            <div className="h-12 w-full bg-zinc-300 dark:bg-zinc-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
