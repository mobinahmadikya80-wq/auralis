import React, { useState } from 'react';
import { 
  Ear, 
  Volume2, 
  Info, 
  Sparkles, 
  Layers, 
  Activity, 
  Stethoscope, 
  AlertCircle, 
  BookOpen,
  Box,
  Eye,
  RotateCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { ANATOMICAL_STRUCTURES, COCHLEAR_TONOTOPIC_MAP } from '../data/anatomy';
import { AnatomicalStructure } from '../types';
import { playComplexCochlearFrequency } from '../utils/audioSynth';
import { Ear3DCanvas } from './Ear3DCanvas';

interface LessonOption {
  id: string;
  title: string;
  relatedStructureId: string;
  description: string;
}

const INTERACTIVE_LESSONS: LessonOption[] = [
  {
    id: 'lesson_tm',
    title: 'Lesson 1: Tympanic Membrane & Acoustic Impedance',
    relatedStructureId: 'tympanic_membrane',
    description: 'Learn how the 3-layered eardrum transforms acoustic air pressure into mechanical movement.',
  },
  {
    id: 'lesson_stapes',
    title: 'Lesson 2: Ossicular Chain & Otosclerosis Fixation',
    relatedStructureId: 'stapes',
    description: 'Examine the 1.3:1 mechanical advantage of malleus, incus, and stapes footplate in the oval window.',
  },
  {
    id: 'lesson_cochlea',
    title: 'Lesson 3: Cochlear Hair Cells & Tonotopic Tuning',
    relatedStructureId: 'cochlea',
    description: 'Explore basilar membrane mechanics from 20 Hz (Apex) to 20,000 Hz (Base).',
  },
  {
    id: 'lesson_vestibular',
    title: 'Lesson 4: Semicircular Canals & Balance Dynamics',
    relatedStructureId: 'semicircular_canals',
    description: 'Inspect the three orthogonal canals driving the Vestibulo-Ocular Reflex (VOR).',
  },
  {
    id: 'lesson_nerve',
    title: 'Lesson 5: CN VIII Nerve & Auditory Brainstem (ABR)',
    relatedStructureId: 'auditory_nerve',
    description: 'Study spiral ganglion action potential propagation and ABR Wave I-V generators.',
  },
];

export const InteractiveEarAnatomy: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [selectedRegion, setSelectedRegion] = useState<'outer' | 'middle' | 'inner' | 'neural' | 'all'>('all');
  const [activeStructure, setActiveStructure] = useState<AnatomicalStructure>(ANATOMICAL_STRUCTURES[0]);
  const [activeFreqNode, setActiveFreqNode] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonOption | null>(null);

  // 3D Canvas toggles
  const [showLabels, setShowLabels] = useState(true);
  const [xrayMode, setXrayMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  const handleLessonSelect = (lesson: LessonOption) => {
    setSelectedLesson(lesson);
    const struct = ANATOMICAL_STRUCTURES.find(s => s.id === lesson.relatedStructureId);
    if (struct) {
      setActiveStructure(struct);
      playComplexCochlearFrequency(1200, 700);
    }
  };

  const handleTonePlay = (freq: number) => {
    setActiveFreqNode(freq);
    playComplexCochlearFrequency(freq, 1200);
    setTimeout(() => setActiveFreqNode(null), 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Section Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            <Ear className="w-3.5 h-3.5" />
            <span>Interactive 3D Medical Ear Anatomy & Tonotopic Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Auditory System 3D Anatomy & Physiology
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Manipulate the 3D ear model using React Three Fiber. Rotate, zoom, pan, toggle X-Ray wireframe mode, and select curriculum lessons to highlight specific anatomical structures automatically.
          </p>
        </div>

        {/* View Mode & Region Filter Controls */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          {/* 3D vs 2D Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-zinc-900 border border-zinc-800 self-start md:self-end">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === '3d'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Model (R3F)</span>
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === '2d'
                  ? 'bg-cyan-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2D Cross-Section</span>
            </button>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            {(['all', 'outer', 'middle', 'inner', 'neural'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                  selectedRegion === reg
                    ? 'bg-zinc-800 text-cyan-400 border border-zinc-700 font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Curriculum Lesson Auto-Highlight Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-500" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Anatomical Lesson Integration
            </h3>
          </div>
          <span className="text-xs text-zinc-500">
            Click a lesson to automatically highlight and focus related 3D anatomy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {INTERACTIVE_LESSONS.map((lesson) => {
            const isSelected = selectedLesson?.id === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => handleLessonSelect(lesson)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500 text-zinc-900 dark:text-white shadow-md'
                    : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div>
                  <div className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center justify-between">
                    <span>{lesson.title.split(':')[0]}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />}
                  </div>
                  <div className="text-xs font-semibold leading-snug line-clamp-2">
                    {lesson.title.split(':')[1]}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
                  {lesson.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Canvas Column (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          
          {/* Header & 3D Control Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-500" />
              {viewMode === '3d' ? '3D Anatomical Render (React Three Fiber)' : '2D Cross-Section Vector Map'}
            </h3>

            {/* 3D Toggles Toolbar */}
            {viewMode === '3d' && (
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    showLabels
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  3D Labels
                </button>
                <button
                  onClick={() => setXrayMode(!xrayMode)}
                  className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
                    xrayMode
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  X-Ray Wireframe
                </button>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1 ${
                    autoRotate
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-300 dark:border-zinc-700'
                  }`}
                >
                  <RotateCw className="w-3 h-3" /> Auto-Rotate
                </button>
              </div>
            )}
          </div>

          {/* 3D Model or 2D Map Render */}
          {viewMode === '3d' ? (
            <Ear3DCanvas
              activeStructure={activeStructure}
              onSelectStructure={(struct) => setActiveStructure(struct)}
              highlightedLessonId={selectedLesson?.relatedStructureId}
              showLabels={showLabels}
              xrayMode={xrayMode}
              autoRotate={autoRotate}
            />
          ) : (
            <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-zinc-950 to-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-inner flex items-center justify-center p-4">
              <svg 
                viewBox="0 0 600 320" 
                className="w-full h-full select-none"
              >
                {/* Pinna */}
                <path
                  d="M 30,100 C 10,140 20,240 70,250 C 90,255 100,230 85,200 C 70,170 85,130 60,110 Z"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="opacity-40"
                />
                {/* Ear Canal */}
                <path
                  d="M 70,180 Q 130,175 200,180"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="opacity-30"
                />
                {/* Tympanic Membrane */}
                <line
                  x1="200" y1="160" x2="200" y2="200"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Ossicles */}
                <path
                  d="M 200,180 L 240,155 L 270,150 L 305,160"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Cochlea */}
                <path
                  d="M 340,185 C 340,160 380,160 380,185 C 380,205 350,205 350,185 C 350,175 370,175 370,185"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Semicircular Canals */}
                <path
                  d="M 350,140 C 350,110 390,110 390,140 M 360,130 C 360,105 385,105 385,130"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
                {/* Auditory Nerve */}
                <path
                  d="M 380,185 Q 440,185 520,140"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="3"
                  strokeDasharray="3 3"
                />

                {/* Hotspot Pins */}
                {ANATOMICAL_STRUCTURES.map((struct) => {
                  const isActive = activeStructure.id === struct.id;
                  const isFilteredOut = selectedRegion !== 'all' && struct.region !== selectedRegion;
                  if (isFilteredOut) return null;

                  return (
                    <g
                      key={struct.id}
                      onClick={() => setActiveStructure(struct)}
                      className="cursor-pointer group"
                    >
                      {isActive && (
                        <circle
                          cx={struct.svgCoordinates.cx}
                          cy={struct.svgCoordinates.cy}
                          r={struct.svgCoordinates.r + 6}
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2"
                          className="animate-ping opacity-75"
                        />
                      )}
                      <circle
                        cx={struct.svgCoordinates.cx}
                        cy={struct.svgCoordinates.cy}
                        r={struct.svgCoordinates.r}
                        fill={isActive ? '#06b6d4' : '#18181b'}
                        stroke={isActive ? '#ffffff' : '#3f3f46'}
                        strokeWidth="2"
                        className="transition-all duration-200 group-hover:scale-125"
                      />
                      <text
                        x={struct.svgCoordinates.cx}
                        y={struct.svgCoordinates.cy + 3}
                        textAnchor="middle"
                        fill={isActive ? '#000000' : '#ffffff'}
                        fontSize="9"
                        fontWeight="bold"
                        className="pointer-events-none font-mono"
                      >
                        {struct.name.substring(0, 2)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* Tonotopic Cochlear Frequency Strip */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-white">
              <span className="font-bold flex items-center gap-2 text-cyan-400">
                <Volume2 className="w-4 h-4" />
                Cochlear Basilar Membrane Tonotopic Map
              </span>
              <span className="text-[11px] text-zinc-400">Click frequency node to play audio</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {COCHLEAR_TONOTOPIC_MAP.map((item) => {
                const isPlaying = activeFreqNode === item.freq;
                return (
                  <button
                    key={item.freq}
                    onClick={() => handleTonePlay(item.freq)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isPlaying
                        ? 'bg-cyan-500 text-zinc-950 font-bold border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono font-semibold opacity-75">
                      {item.freq >= 1000 ? `${item.freq / 1000} kHz` : `${item.freq} Hz`}
                    </div>
                    <div className="text-[9px] truncate font-medium text-zinc-400 mt-0.5">
                      {item.regionName.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Detail Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          
          {/* Header */}
          <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                {activeStructure.region} Ear Region
              </span>
              {activeStructure.latinName && (
                <span className="text-xs text-zinc-400 italic">
                  {activeStructure.latinName}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white font-display">
              {activeStructure.name}
            </h3>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Anatomical Description
            </h4>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
              {activeStructure.description}
            </p>
          </div>

          {/* Key Functions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              Primary Acoustic & Mechanical Functions
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
              {activeStructure.keyFunctions.map((fn, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  <span>{fn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Significance */}
          <div className="space-y-2 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4" />
              Clinical Significance
            </h4>
            <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
              {activeStructure.clinicalSignificance}
            </p>
          </div>

          {/* Pathologies */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              Associated Clinical Pathologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeStructure.pathologyAssociation.map((path) => (
                <span
                  key={path}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                >
                  {path}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
