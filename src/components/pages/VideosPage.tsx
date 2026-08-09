import React, { useState } from 'react';
import { Video, Play, Clock, Eye, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { getVideos } from '../../content/loader';

export const VideosPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const videos = getVideos();

  const categories = ['All', ...Array.from(new Set(videos.map((v) => v.category)))];

  const filtered = activeFilter === 'All' ? videos : videos.filter(v => v.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Video className="w-3.5 h-3.5" />
          <span>Clinical Video Vault</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          Audiology Clinical Video Demonstrations
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          High-definition clinical procedure videos showing physical otoscopy, ABR electrode prep, REM probe tube placement, and pediatric VRA conditioning.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === c
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((v) => (
          <div
            key={v.id}
            className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-cyan-500/50 transition-all group flex flex-col justify-between"
          >
            {/* Thumbnail Player Placeholder */}
            <div className="relative aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
              
              <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-zinc-950 flex items-center justify-center z-20 shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              </div>

              <span className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-md bg-zinc-900/90 text-white font-mono text-[10px] border border-zinc-700">
                {v.duration}
              </span>
            </div>

            {/* Video Details */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  {v.category}
                </span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {v.views} Views</span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                {v.title}
              </h3>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {v.description}
              </p>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 flex justify-between items-center">
                <span>Presenter: <strong className="text-zinc-700 dark:text-zinc-300">{v.author}</strong></span>
                <button
                  onClick={() => alert(`Launching Video Player for: ${v.title}`)}
                  className="text-cyan-500 font-bold hover:underline flex items-center gap-1"
                >
                  Watch Lecture <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
