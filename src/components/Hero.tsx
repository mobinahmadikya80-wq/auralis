import React from 'react';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Ear, 
  Activity, 
  Calculator, 
  Stethoscope,
  GraduationCap,
  Download,
  Users
} from 'lucide-react';

interface HeroProps {
  onSearchClick: () => void;
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchClick, onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80">
      
      {/* Background Subtle Mesh & Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] opacity-25 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        
        {/* Open Access Banner */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-medium backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>100% Free Open Educational Archive for Audiology Professionals</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-white max-w-4xl mx-auto leading-tight">
          The Next-Generation Platform for{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Audiological Science
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Access open-access course notes, peer-reviewed textbooks, interactive 3D ear anatomy models, real-time audiogram plotting labs, and AI clinical tutors.
        </p>

        {/* Central Search Action Box */}
        <div className="max-w-xl mx-auto pt-2">
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 hover:border-cyan-500/50 text-zinc-400 hover:text-zinc-200 shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Search topics e.g. "ABR Wave Latency", "Presbycusis", "SII Calculator"...</span>
            </div>
            <span className="text-xs font-mono px-2 py-1 bg-zinc-800 rounded-md text-zinc-400 border border-zinc-700">
              Cmd + K
            </span>
          </button>
        </div>

        {/* Key Feature Quick Jumps */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          
          <button 
            onClick={() => onNavigate('anatomy')}
            className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 hover:bg-zinc-800/60 transition-all group"
          >
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Ear className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">3D Anatomy</span>
            </div>
            <p className="text-xs text-zinc-300 font-semibold">Tonotopic Ear Explorer</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Interactive hair cell audio map</p>
          </button>

          <button 
            onClick={() => onNavigate('simulator')}
            className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-blue-500/40 hover:bg-zinc-800/60 transition-all group"
          >
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">Audiogram Lab</span>
            </div>
            <p className="text-xs text-zinc-300 font-semibold">Pure-Tone Plotter</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Live PTA & Degree Classifier</p>
          </button>

          <button 
            onClick={() => onNavigate('tools')}
            className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-800/60 transition-all group"
          >
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Calculator className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">Calculators</span>
            </div>
            <p className="text-xs text-zinc-300 font-semibold">SII & Noise Dose</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Clinical acoustic formulas</p>
          </button>

          <button 
            onClick={() => onNavigate('cases')}
            className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800/60 transition-all group"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Stethoscope className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">Case Battery</span>
            </div>
            <p className="text-xs text-zinc-300 font-semibold">Real Patient Cases</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Otoscopy & Tympanometry</p>
          </button>

        </div>

        {/* Key Metrics Counter Strip */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-xs text-zinc-400 border-t border-zinc-800/60 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span><strong className="text-white font-semibold">100%</strong> Free for Students</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span><strong className="text-white font-semibold">Open Access</strong> Textbooks & Papers</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Built for <strong className="text-white font-semibold">Clinicians & Faculty</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
