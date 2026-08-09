import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

export interface VideoPlayerProps {
  title?: string;
  duration?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title = 'Clinical Otoscopy & Tympanic Membrane Inspection',
  duration = '08:45',
  thumbnailUrl = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className={`bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative group ${className}`}>
      {/* Video Canvas / Thumbnail */}
      <div className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isPlaying ? 'scale-105 opacity-80' : 'opacity-60'
          }`}
        />

        {/* Play Overlay Button */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute p-5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-2xl shadow-cyan-500/50 hover:scale-110 transition-all z-10"
          >
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
        )}

        {/* Top Info Bar */}
        <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-zinc-950/90 to-transparent flex items-center justify-between text-white z-10">
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold font-display leading-tight">{title}</h4>
            <span className="text-[10px] font-mono text-cyan-400">4K Ultra-HD Clinical Recording</span>
          </div>
          <span className="text-xs font-mono bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-zinc-700/50">
            {duration}
          </span>
        </div>

        {/* Playing Animated Indicator */}
        {isPlaying && (
          <div className="absolute bottom-16 left-6 px-3 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold flex items-center gap-2 z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Streaming HD Audio & Video...</span>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-zinc-300 text-xs font-mono">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsPlaying(false)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>02:14 / {duration}</span>
          <button className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
