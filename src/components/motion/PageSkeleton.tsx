import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-zinc-200/80 dark:bg-zinc-800/80 rounded" />
        <div className="h-3 w-5/6 bg-zinc-200/80 dark:bg-zinc-800/80 rounded" />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <div className="h-5 w-16 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-full" />
        <div className="h-5 w-16 bg-zinc-200/60 dark:bg-zinc-800/60 rounded-full" />
      </div>
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 space-y-4 animate-pulse">
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-8 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-4 w-1/2 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};
