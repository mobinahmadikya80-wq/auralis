import React, { useState } from 'react';
import { 
  Calculator, 
  Volume2, 
  ShieldAlert, 
  Gauge, 
  Sliders, 
  HelpCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  calculateCountTheDotsSII, 
  calculateNoiseExposurePermissibleTime, 
  convertDbHLToDbSPL, 
  convertDbSPLToDbHL, 
  RETSPL_VALUES 
} from '../utils/audiology';

export const ToolsSuite: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'sii' | 'noise' | 'unit' | 'masking'>('sii');

  // SII State
  const [sii500, setSii500] = useState<number>(20);
  const [sii1000, setSii1000] = useState<number>(25);
  const [sii2000, setSii2000] = useState<number>(35);
  const [sii4000, setSii4000] = useState<number>(50);

  const siiResult = calculateCountTheDotsSII([
    { frequency: 500, decibels: sii500 },
    { frequency: 1000, decibels: sii1000 },
    { frequency: 2000, decibels: sii2000 },
    { frequency: 4000, decibels: sii4000 },
  ]);

  // Noise Exposure State
  const [noiseLevelDba, setNoiseLevelDba] = useState<number>(95);
  const [noiseStandard, setNoiseStandard] = useState<'NIOSH' | 'OSHA'>('NIOSH');
  const noiseResult = calculateNoiseExposurePermissibleTime(noiseLevelDba, noiseStandard);

  // dB Unit Converter State
  const [selectedFreq, setSelectedFreq] = useState<number>(1000);
  const [inputDbHl, setInputDbHl] = useState<number>(40);
  const calculatedSpl = convertDbHLToDbSPL(selectedFreq, inputDbHl);

  // Masking Calculator State
  const [testEarAir, setTestEarAir] = useState<number>(65);
  const [nonTestEarAir, setNonTestEarAir] = useState<number>(15);
  const [testEarBone, setTestEarBone] = useState<number>(20);
  const atten = 40; // Supra-aural attenuation default

  const needsMasking = testEarAir - testEarBone >= atten;
  const minMasking = testEarAir - atten + (nonTestEarAir - testEarBone);
  const maxMasking = testEarBone + atten - 5;
  const isMaskingDilemma = minMasking > maxMasking;

  return (
    <div className="space-y-8">
      
      {/* Tools Top Header Banner */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-500/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Clinical Audiology Calculator & Acoustic Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
            Audiological Clinical Tools Suite
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Perform instant Speech Intelligibility Index (SII) count-the-dots calculations, occupational noise exposure dose limits, RETSPL dB SPL conversions, and clinical masking thresholds.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setActiveTool('sii')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'sii'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            Speech Intelligibility Index (SII)
          </button>
          <button
            onClick={() => setActiveTool('noise')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'noise'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            Noise Exposure Dose Limits
          </button>
          <button
            onClick={() => setActiveTool('unit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'unit'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            dB SPL ↔ dB HL RETSPL Converter
          </button>
          <button
            onClick={() => setActiveTool('masking')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTool === 'masking'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
            }`}
          >
            Clinical Masking Calculator
          </button>
        </div>
      </div>

      {/* Tool Content Views */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        
        {/* Tool 1: SII Count the Dots */}
        {activeTool === 'sii' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                Count-the-Dots Speech Intelligibility Index (SII)
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                The Count-the-Dots audiogram represents the 100 dots distributed across key speech acoustic frequencies (Mueller & Killion). Adjust pure-tone thresholds below to see how many dots remain audible for conversational speech.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>500 Hz Threshold</span>
                    <span className="font-mono text-cyan-500">{sii500} dB HL</span>
                  </div>
                  <input
                    type="range" min="0" max="90" step="5" value={sii500}
                    onChange={(e) => setSii500(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>1000 Hz Threshold</span>
                    <span className="font-mono text-cyan-500">{sii1000} dB HL</span>
                  </div>
                  <input
                    type="range" min="0" max="90" step="5" value={sii1000}
                    onChange={(e) => setSii1000(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>2000 Hz Threshold</span>
                    <span className="font-mono text-cyan-500">{sii2000} dB HL</span>
                  </div>
                  <input
                    type="range" min="0" max="90" step="5" value={sii2000}
                    onChange={(e) => setSii2000(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>4000 Hz Threshold</span>
                    <span className="font-mono text-cyan-500">{sii4000} dB HL</span>
                  </div>
                  <input
                    type="range" min="0" max="90" step="5" value={sii4000}
                    onChange={(e) => setSii4000(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 text-white space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase text-cyan-400">Calculated SII Output</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-400 mt-1">
                  {siiResult.siiScorePercent}%
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  {siiResult.dotsVisibleCount} / 100 Acoustic Speech Dots Audible
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${siiResult.siiScorePercent}%` }}
                />
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                <strong className="text-cyan-400">Clinical Interpretation:</strong> An SII score of {siiResult.siiScorePercent}% means the patient receives approximately {siiResult.siiScorePercent}% of the acoustic cues necessary for unassisted conversational speech perception.
              </div>
            </div>
          </div>
        )}

        {/* Tool 2: Noise Exposure Calculator */}
        {activeTool === 'noise' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                Occupational & Environmental Noise Exposure Time Calculator
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Noise Sound Pressure Level (dBA)</span>
                    <span className="font-mono text-rose-500">{noiseLevelDba} dBA</span>
                  </div>
                  <input
                    type="range" min="80" max="120" step="1" value={noiseLevelDba}
                    onChange={(e) => setNoiseLevelDba(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-500"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span>Standard Criterion:</span>
                  <button
                    onClick={() => setNoiseStandard('NIOSH')}
                    className={`px-3 py-1.5 rounded-lg border ${
                      noiseStandard === 'NIOSH'
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    NIOSH (85 dBA REL, 3 dB exchange rate)
                  </button>
                  <button
                    onClick={() => setNoiseStandard('OSHA')}
                    className={`px-3 py-1.5 rounded-lg border ${
                      noiseStandard === 'OSHA'
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    OSHA (90 dBA PEL, 5 dB exchange rate)
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 text-white space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase text-rose-400">Permissible Daily Exposure Duration</span>
                <div className="text-3xl font-extrabold font-mono text-rose-400 mt-1">
                  {noiseResult.formattedTime}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Based on {noiseStandard} standard at {noiseLevelDba} dBA
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                <strong className="text-rose-400">Safety Warning:</strong> Exceeding {noiseResult.formattedTime} at {noiseLevelDba} dBA causes cumulative metabolic stress and mechanical outer hair cell damage in the 4 kHz basilar membrane region. Hearing protection required.
              </div>
            </div>
          </div>
        )}

        {/* Tool 3: dB Converter */}
        {activeTool === 'unit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                RETSPL Reference Unit Conversion (dB HL to dB SPL)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Select Frequency (Hz):</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[125, 250, 500, 1000, 2000, 4000, 8000].map(f => (
                      <button
                        key={f}
                        onClick={() => setSelectedFreq(f)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          selectedFreq === f ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {f} Hz
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Input Threshold (dB HL)</span>
                    <span className="font-mono text-cyan-500">{inputDbHl} dB HL</span>
                  </div>
                  <input
                    type="range" min="-10" max="110" step="5" value={inputDbHl}
                    onChange={(e) => setInputDbHl(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 text-white space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase text-cyan-400">Converted Sound Pressure Level</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-400 mt-1">
                  {calculatedSpl} <span className="text-sm text-zinc-400">dB SPL</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  RETSPL Constant for {selectedFreq} Hz = {RETSPL_VALUES[selectedFreq]} dB
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
                Formula: dB SPL = dB HL + RETSPL<br/>
                {inputDbHl} + {RETSPL_VALUES[selectedFreq]} = {calculatedSpl} dB SPL
              </div>
            </div>
          </div>
        )}

        {/* Tool 4: Masking Calculator */}
        {activeTool === 'masking' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                Clinical Masking Calculator & Effective Plateau Analyzer
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400">Test Ear Air (dB)</label>
                  <input
                    type="number" value={testEarAir} onChange={(e) => setTestEarAir(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-mono font-bold"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400">Non-Test Ear Air (dB)</label>
                  <input
                    type="number" value={nonTestEarAir} onChange={(e) => setNonTestEarAir(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-mono font-bold"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400">Test Ear Bone (dB)</label>
                  <input
                    type="number" value={testEarBone} onChange={(e) => setTestEarBone(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 text-white space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-400">Clinical Masking Status</span>
                <div className="text-xl font-bold text-white mt-1">
                  {needsMasking ? 'Masking Required' : 'Masking Not Required'}
                </div>
              </div>

              {needsMasking && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Minimum Effective Masking:</span>
                    <span className="font-mono font-bold text-indigo-400">{minMasking} dB EM</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Maximum Permissible Masking:</span>
                    <span className="font-mono font-bold text-indigo-400">{maxMasking} dB EM</span>
                  </div>

                  {isMaskingDilemma && (
                    <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300">
                      <strong>Masking Dilemma Detected!</strong> Minimum masking level exceeds maximum level. Use insertion earphones to increase interaural attenuation (IA) to 60 dB.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
