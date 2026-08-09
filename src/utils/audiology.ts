import { AudiogramData, ThresholdPoint } from '../types';

export const STANDARD_FREQUENCIES = [125, 250, 500, 1000, 2000, 4000, 8000];

// Pure Tone Average (PTA) Calculation (500, 1000, 2000 Hz)
export function calculatePTA(thresholds: ThresholdPoint[], freqs = [500, 1000, 2000]): number {
  const relevantPoints = thresholds.filter(tp => freqs.includes(tp.frequency));
  if (relevantPoints.length === 0) return 0;
  const sum = relevantPoints.reduce((acc, curr) => acc + curr.decibels, 0);
  return Math.round(sum / relevantPoints.length);
}

export function getDegreeOfHearingLoss(pta: number): {
  degree: string;
  colorClass: string;
  description: string;
} {
  if (pta <= 20) {
    return {
      degree: 'Normal Hearing',
      colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'Thresholds are within normal limits (0 - 20 dB HL). Standard auditory perception.'
    };
  } else if (pta <= 40) {
    return {
      degree: 'Mild Hearing Loss',
      colorClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
      description: 'Difficulty hearing faint or distant speech, soft whispers, or background noise.'
    };
  } else if (pta <= 55) {
    return {
      degree: 'Moderate Hearing Loss',
      colorClass: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/30',
      description: 'Understands conversational speech only at close distances (3-5 feet). Requires amplification.'
    };
  } else if (pta <= 70) {
    return {
      degree: 'Moderately-Severe Hearing Loss',
      colorClass: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30',
      description: 'Speech must be loud; difficulty understanding group conversations without hearing aids/CI.'
    };
  } else if (pta <= 90) {
    return {
      degree: 'Severe Hearing Loss',
      colorClass: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30',
      description: 'Can only hear loud shouts or environmental sounds like sirens or heavy traffic.'
    };
  } else {
    return {
      degree: 'Profound Hearing Loss',
      colorClass: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/30',
      description: 'Cannot perceive conversational speech. May rely on visual cues, sign language, or cochlear implants.'
    };
  }
}

// Determine Type of Loss based on Air-Bone Gap
export function getTypeOfHearingLoss(
  airPoints: ThresholdPoint[],
  bonePoints?: ThresholdPoint[]
): string {
  const ptaAir = calculatePTA(airPoints);
  if (ptaAir <= 20) return 'Normal Hearing Sensitivity';

  if (!bonePoints || bonePoints.length === 0) {
    return 'Sensorineural or Conductive (Bone conduction thresholds needed)';
  }

  const ptaBone = calculatePTA(bonePoints);
  const airBoneGap = ptaAir - ptaBone;

  if (ptaBone <= 20 && airBoneGap > 10) {
    return 'Conductive Hearing Loss (Outer/Middle Ear Involvement)';
  } else if (ptaBone > 20 && airBoneGap <= 10) {
    return 'Sensorineural Hearing Loss (Cochlear or Auditory Nerve Pathway)';
  } else if (ptaBone > 20 && airBoneGap > 10) {
    return 'Mixed Hearing Loss (Combined Conductive & Sensorineural Components)';
  }

  return 'Sensorineural Hearing Loss';
}

// Audiogram Configuration Analysis
export function getAudiogramConfiguration(thresholds: ThresholdPoint[]): string {
  const t125 = thresholds.find(t => t.frequency === 125)?.decibels ?? 0;
  const t250 = thresholds.find(t => t.frequency === 250)?.decibels ?? t125;
  const t500 = thresholds.find(t => t.frequency === 500)?.decibels ?? 0;
  const t1000 = thresholds.find(t => t.frequency === 1000)?.decibels ?? 0;
  const t2000 = thresholds.find(t => t.frequency === 2000)?.decibels ?? 0;
  const t4000 = thresholds.find(t => t.frequency === 4000)?.decibels ?? 0;
  const t8000 = thresholds.find(t => t.frequency === 8000)?.decibels ?? 0;

  // Check 4kHz Noise Notch
  if (t4000 - t2000 >= 15 && t4000 - t8000 >= 10 && t4000 >= 35) {
    return 'Noise-Induced Notch (Acoustic Trauma Notch at 4 kHz)';
  }

  const highFreqAvg = (t4000 + t8000) / 2;
  const lowFreqAvg = (t250 + t500) / 2;

  if (highFreqAvg - lowFreqAvg >= 25) {
    return 'Sloping High-Frequency Loss (Presbycusis pattern)';
  } else if (lowFreqAvg - highFreqAvg >= 20) {
    return 'Rising Low-Frequency Loss (Low-tone sensorineural / Meniere-like)';
  } else if (Math.abs(highFreqAvg - lowFreqAvg) <= 10) {
    return 'Symmetrical Flat Configuration';
  } else if (t1000 > t500 + 15 && t1000 > t4000 + 15) {
    return 'Cookie-Bite (Mid-Frequency Loss)';
  }

  return 'Sloping Configuration';
}

// Calculate Speech Intelligibility Index (SII) Count-the-Dots Approximation
// Count-the-dots grid has 100 total dots placed according to speech acoustics
export function calculateCountTheDotsSII(airThresholds: ThresholdPoint[]): {
  siiScorePercent: number;
  dotsVisibleCount: number;
} {
  // Frequency weightings / dot distributions
  const dotDistribution: Record<number, { db: number; dots: number }[]> = {
    500: [
      { db: 25, dots: 3 },
      { db: 35, dots: 3 },
      { db: 45, dots: 3 },
      { db: 55, dots: 3 },
    ],
    1000: [
      { db: 20, dots: 4 },
      { db: 30, dots: 5 },
      { db: 40, dots: 5 },
      { db: 50, dots: 5 },
      { db: 60, dots: 5 },
    ],
    2000: [
      { db: 20, dots: 6 },
      { db: 30, dots: 7 },
      { db: 40, dots: 8 },
      { db: 50, dots: 8 },
      { db: 60, dots: 5 },
    ],
    4000: [
      { db: 20, dots: 5 },
      { db: 30, dots: 5 },
      { db: 40, dots: 5 },
      { db: 50, dots: 5 },
      { db: 60, dots: 5 },
    ]
  };

  let totalAudibleDots = 0;

  for (const [freqStr, levels] of Object.entries(dotDistribution)) {
    const freq = parseInt(freqStr, 10);
    const tp = airThresholds.find(t => t.frequency === freq);
    const userThreshold = tp ? tp.decibels : 0;

    // Normal conversational speech dynamic range ~ 45 dB HL average (30 to 60 dB HL range)
    for (const lvl of levels) {
      if (userThreshold < lvl.db) {
        totalAudibleDots += lvl.dots;
      }
    }
  }

  // Cap at 100
  const score = Math.min(100, Math.max(0, totalAudibleDots));
  return {
    siiScorePercent: score,
    dotsVisibleCount: totalAudibleDots
  };
}

// Noise Exposure Duration Limits (NIOSH vs OSHA)
export function calculateNoiseExposurePermissibleTime(dBA: number, standard: 'NIOSH' | 'OSHA'): {
  hoursPermissible: number;
  formattedTime: string;
} {
  let hours = 0;
  if (standard === 'NIOSH') {
    // 85 dBA criterion level, 3 dB exchange rate
    // T = 8 / (2 ^ ((L - 85) / 3))
    hours = 8 / Math.pow(2, (dBA - 85) / 3);
  } else {
    // OSHA: 90 dBA criterion level, 5 dB exchange rate
    // T = 8 / (2 ^ ((L - 90) / 5))
    hours = 8 / Math.pow(2, (dBA - 90) / 5);
  }

  if (hours > 24) {
    return { hoursPermissible: hours, formattedTime: '> 24 hours (Safe level)' };
  } else if (hours < 0.016) {
    return { hoursPermissible: hours, formattedTime: '< 1 minute (Extreme Hazard!)' };
  }

  const totalMinutes = Math.round(hours * 60);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  let formatted = '';
  if (hrs > 0) formatted += `${hrs} hr `;
  if (mins > 0 || hrs === 0) formatted += `${mins} min`;

  return { hoursPermissible: hours, formattedTime: formatted.trim() };
}

// Convert dB SPL to dB HL or vice versa for standard RETSPL values
export const RETSPL_VALUES: Record<number, number> = {
  125: 45.0,
  250: 27.0,
  500: 13.5,
  1000: 7.5,
  2000: 11.0,
  4000: 10.5,
  8000: 13.0
};

export function convertDbHLToDbSPL(frequency: number, dbHL: number): number {
  const retspl = RETSPL_VALUES[frequency] || 10;
  return dbHL + retspl;
}

export function convertDbSPLToDbHL(frequency: number, dbSPL: number): number {
  const retspl = RETSPL_VALUES[frequency] || 10;
  return dbSPL - retspl;
}
