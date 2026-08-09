import React, { useState } from 'react';
import { 
  Activity, 
  Volume2, 
  RotateCcw, 
  Download, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Layers,
  FileCheck
} from 'lucide-react';
import { ThresholdPoint, AudiogramData } from '../types';
import { 
  STANDARD_FREQUENCIES, 
  calculatePTA, 
  getDegreeOfHearingLoss, 
  getTypeOfHearingLoss, 
  getAudiogramConfiguration 
} from '../utils/audiology';
import { playPureTone } from '../utils/audioSynth';

export const AudiogramSimulator: React.FC = () => {
  const [activeEar, setActiveEar] = useState<'right' | 'left'>('right');
  const [conductionType, setConductionType] = useState<'air' | 'bone'>('air');

  // Initial Default Audiogram State (Normal baseline)
  const [audiogram, setAudiogram] = useState<AudiogramData>({
    rightEarAir: STANDARD_FREQUENCIES.map(f => ({ frequency: f, decibels: 10 })),
    rightEarBone: [500, 1000, 2000, 4000].map(f => ({ frequency: f, decibels: 10 })),
    leftEarAir: STANDARD_FREQUENCIES.map(f => ({ frequency: f, decibels: 10 })),
    leftEarBone: [500, 1000, 2000, 4000].map(f => ({ frequency: f, decibels: 10 })),
  });

  const currentAirThresholds = activeEar === 'right' ? audiogram.rightEarAir : audiogram.leftEarAir;
  const currentBoneThresholds = activeEar === 'right' ? audiogram.rightEarBone : audiogram.leftEarBone;

  // Handle threshold change via slider or click
  const updateThreshold = (freq: number, newDb: number) => {
    setAudiogram(prev => {
      if (conductionType === 'air') {
        const key = activeEar === 'right' ? 'rightEarAir' : 'leftEarAir';
        return {
          ...prev,
          [key]: prev[key].map(tp => tp.frequency === freq ? { ...tp, decibels: newDb } : tp)
        };
      } else {
        const key = activeEar === 'right' ? 'rightEarBone' : 'leftEarBone';
        const exists = prev[key]?.some(tp => tp.frequency === freq);
        if (!exists && prev[key]) {
          return {
            ...prev,
            [key]: [...prev[key], { frequency: freq, decibels: newDb }]
          };
        }
        return {
          ...prev,
          [key]: prev[key]?.map(tp => tp.frequency === freq ? { ...tp, decibels: newDb } : tp) || []
        };
      }
    });
  };

  // Preset Configurations Loader
  const loadPreset = (preset: 'normal' | 'presbycusis' | 'otosclerosis' | 'nihl') => {
    if (preset === 'normal') {
      setAudiogram({
        rightEarAir: STANDARD_FREQUENCIES.map(f => ({ frequency: f, decibels: 10 })),
        rightEarBone: [500, 1000, 2000, 4000].map(f => ({ frequency: f, decibels: 10 })),
        leftEarAir: STANDARD_FREQUENCIES.map(f => ({ frequency: f, decibels: 10 })),
        leftEarBone: [500, 1000, 2000, 4000].map(f => ({ frequency: f, decibels: 10 })),
      });
    } else if (preset === 'presbycusis') {
      const rightAir = [125, 250, 500, 1000, 2000, 4000, 8000].map((f, i) => ({
        frequency: f,
        decibels: [15, 20, 25, 35, 50, 65, 80][i]
      }));
      setAudiogram({
        rightEarAir: rightAir,
        rightEarBone: rightAir.filter(p => p.frequency >= 500 && p.frequency <= 4000),
        leftEarAir: rightAir,
        leftEarBone: rightAir.filter(p => p.frequency >= 500 && p.frequency <= 4000),
      });
    } else if (preset === 'otosclerosis') {
      const rightAir = [125, 250, 500, 1000, 2000, 4000, 8000].map((f, i) => ({
        frequency: f,
        decibels: [35, 40, 45, 45, 40, 35, 25][i]
      }));
      const rightBone = [500, 1000, 2000, 4000].map((f, i) => ({
        frequency: f,
        decibels: [10, 15, 30, 15][i] // Carhart notch at 2k
      }));
      setAudiogram({
        rightEarAir: rightAir,
        rightEarBone: rightBone,
        leftEarAir: STANDARD_FREQUENCIES.map(f => ({ frequency: f, decibels: 10 })),
        leftEarBone: [500, 1000, 2000, 4000].map(f => ({ frequency: f, decibels: 10 })),
      });
    } else if (preset === 'nihl') {
      const air = [125, 250, 500, 1000, 2000, 4000, 8000].map((f, i) => ({
        frequency: f,
        decibels: [10, 10, 15, 15, 25, 65, 30][i] // 4k Notch
      }));
      setAudiogram({
        rightEarAir: air,
        rightEarBone: air.filter(p => p.frequency >= 500 && p.frequency <= 4000),
        leftEarAir: air,
        leftEarBone: air.filter(p => p.frequency >= 500 && p.frequency <= 4000),
      });
    }
  };

  // Calculations for current active ear
  const pta = calculatePTA(currentAirThresholds);
  const degreeObj = getDegreeOfHearingLoss(pta);
  const typeStr = getTypeOfHearingLoss(currentAirThresholds, currentBoneThresholds);
  const configStr = getAudiogramConfiguration(currentAirThresholds);

  return (
    <div className="space-y-8">
      
      {/* Simulator Top Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-500/20">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Clinical Audiometer Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display mt-2">
              Pure-Tone Audiogram Laboratory
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Plot air and bone conduction thresholds (-10 dB to 120 dB HL). Listen to synthesized tones and inspect automated diagnostic interpretations.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => loadPreset('normal')}
              className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 font-medium"
            >
              Normal Preset
            </button>
            <button
              onClick={() => loadPreset('presbycusis')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium"
            >
              Presbycusis
            </button>
            <button
              onClick={() => loadPreset('otosclerosis')}
              className="px-3 py-1.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-medium"
            >
              Otosclerosis
            </button>
            <button
              onClick={() => loadPreset('nihl')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-medium"
            >
              4 kHz Notch (NIHL)
            </button>
          </div>
        </div>

        {/* Ear & Transducer Mode Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-bold uppercase">Ear Selection:</span>
            <button
              onClick={() => setActiveEar('right')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeEar === 'right'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Right Ear (Red O)
            </button>
            <button
              onClick={() => setActiveEar('left')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeEar === 'left'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Left Ear (Blue X)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-bold uppercase">Transducer Mode:</span>
            <button
              onClick={() => setConductionType('air')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                conductionType === 'air'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Air Conduction
            </button>
            <button
              onClick={() => setConductionType('bone')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                conductionType === 'bone'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Bone Conduction
            </button>
          </div>

        </div>

      </div>

      {/* Main Grid: Audiogram Graph + Live Diagnostic Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Audiogram Plotter Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              Standard Clinical Audiogram Plot (dB HL)
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              Frequency (Hz) vs Hearing Level (dB HL)
            </span>
          </div>

          {/* SVG Audiogram Chart */}
          <div className="relative w-full aspect-[4/3] bg-zinc-950 rounded-2xl border border-zinc-800 p-4 overflow-hidden shadow-inner select-none">
            
            <svg viewBox="0 0 500 380" className="w-full h-full">
              
              {/* Grid Lines for dB HL (-10 to 120) */}
              {[-10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((db, i) => {
                const y = 30 + i * 25;
                return (
                  <g key={db}>
                    <line x1="45" y1={y} x2="475" y2={y} stroke="#27272a" strokeWidth="1" />
                    <text x="35" y={y + 4} textAnchor="end" fill="#71717a" fontSize="10" className="font-mono">
                      {db}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Frequency Lines */}
              {STANDARD_FREQUENCIES.map((freq, i) => {
                const x = 60 + i * 65;
                return (
                  <g key={freq}>
                    <line x1={x} y1="20" x2={x} y2="360" stroke="#27272a" strokeWidth="1" />
                    <text x={x} y="15" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="bold" className="font-mono">
                      {freq >= 1000 ? `${freq / 1000}k` : freq}
                    </text>
                  </g>
                );
              })}

              {/* Speech Banana Acoustic Shade Overlay */}
              <path
                d="M 125,115 Q 190,105 255,100 Q 320,100 385,115 Q 450,130 450,165 Q 320,175 190,165 Q 125,155 125,115 Z"
                fill="#f59e0b"
                fillOpacity="0.08"
                stroke="#f59e0b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="250" y="140" textAnchor="middle" fill="#f59e0b" fontSize="10" opacity="0.6" className="font-semibold">
                Conversational Speech Spectrum
              </text>

              {/* Right Ear Air Conduction Red Line & Circles */}
              {(() => {
                const points = audiogram.rightEarAir.map((tp, i) => {
                  const x = 60 + i * 65;
                  const y = 30 + ((tp.decibels + 10) / 10) * 25;
                  return { x, y, tp };
                });

                const pathStr = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');

                return (
                  <g>
                    <path d={pathStr} fill="none" stroke="#ef4444" strokeWidth="2.5" />
                    {points.map((p) => (
                      <circle
                        key={p.tp.frequency}
                        cx={p.x}
                        cy={p.y}
                        r="6"
                        fill="#09090b"
                        stroke="#ef4444"
                        strokeWidth="2.5"
                        className="cursor-pointer hover:scale-150 transition-transform"
                        onClick={() => playPureTone(p.tp.frequency, p.tp.decibels, 800, 'right')}
                      />
                    ))}
                  </g>
                );
              })()}

              {/* Left Ear Air Conduction Blue Line & Crosses (X) */}
              {(() => {
                const points = audiogram.leftEarAir.map((tp, i) => {
                  const x = 60 + i * 65;
                  const y = 30 + ((tp.decibels + 10) / 10) * 25;
                  return { x, y, tp };
                });

                const pathStr = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');

                return (
                  <g>
                    <path d={pathStr} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="5 3" />
                    {points.map((p) => (
                      <g
                        key={p.tp.frequency}
                        onClick={() => playPureTone(p.tp.frequency, p.tp.decibels, 800, 'left')}
                        className="cursor-pointer"
                      >
                        <line x1={p.x - 5} y1={p.y - 5} x2={p.x + 5} y2={p.y + 5} stroke="#3b82f6" strokeWidth="2.5" />
                        <line x1={p.x + 5} y1={p.y - 5} x2={p.x - 5} y2={p.y + 5} stroke="#3b82f6" strokeWidth="2.5" />
                      </g>
                    ))}
                  </g>
                );
              })()}

            </svg>

          </div>

          {/* Interactive Frequency Threshold Sliders */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Adjust {activeEar.toUpperCase()} EAR {conductionType.toUpperCase()} Thresholds (dB HL)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {(conductionType === 'air' ? currentAirThresholds : (currentBoneThresholds || [])).map((tp) => (
                <div key={tp.frequency} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                      {tp.frequency >= 1000 ? `${tp.frequency / 1000} kHz` : `${tp.frequency} Hz`}
                    </span>
                    <button
                      onClick={() => playPureTone(tp.frequency, tp.decibels, 600, activeEar)}
                      className="text-cyan-500 hover:text-cyan-400"
                      title="Play Tone"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="-10"
                      max="120"
                      step="5"
                      value={tp.decibels}
                      onChange={(e) => updateThreshold(tp.frequency, parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-500 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold w-12 text-right text-zinc-900 dark:text-zinc-100">
                      {tp.decibels} dB
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Live Diagnostic Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500">
              Automated Audiometric Diagnostic Classifier
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mt-1">
              {activeEar.toUpperCase()} Ear Diagnostic Analysis
            </h3>
          </div>

          {/* PTA Score Badge */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-400 font-medium">Pure Tone Average (PTA)</div>
              <div className="text-3xl font-extrabold text-zinc-900 dark:text-white font-mono mt-1">
                {pta} <span className="text-sm font-sans font-normal text-zinc-500">dB HL</span>
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">(Calculated at 500, 1000, 2000 Hz)</div>
            </div>

            <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${degreeObj.colorClass}`}>
              {degreeObj.degree}
            </div>
          </div>

          {/* Degree Description */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Functional Auditory Impact
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-100/60 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              {degreeObj.description}
            </p>
          </div>

          {/* Type of Loss */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Site of Lesion / Type of Loss
            </h4>
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
              {typeStr}
            </div>
          </div>

          {/* Audiogram Configuration */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Configuration Contour
            </h4>
            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-600 dark:text-purple-400">
              {configStr}
            </div>
          </div>

          {/* Clinical Action Button */}
          <button
            onClick={() => alert(`Audiogram Diagnostic Report:\nEar: ${activeEar.toUpperCase()}\nPTA: ${pta} dB HL\nDegree: ${degreeObj.degree}\nType: ${typeStr}\nConfiguration: ${configStr}`)}
            className="w-full py-3 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            <span>Export Clinical Audiometric Report</span>
          </button>

        </div>

      </div>

    </div>
  );
};
