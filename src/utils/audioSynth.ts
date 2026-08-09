// Web Audio API Pure-Tone Sound Synthesizer for Audiometry & Tonotopic Cochlear Simulation

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPureTone(
  frequency: number,
  dbHL: number,
  durationMs = 800,
  ear: 'right' | 'left' | 'both' = 'both'
): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

    // Convert dB HL to normalized gain (0.0 to 1.0 safely)
    // 0 dB HL is audible soft tone (~0.01 amplitude), 100 dB HL is loud (~0.5 amplitude)
    const normalizedGain = Math.min(0.8, Math.max(0.001, Math.pow(10, (dbHL - 70) / 40)));

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Apply soft envelope attack & decay to eliminate acoustic clicks
    const now = ctx.currentTime;
    const duration = durationMs / 1000;
    const attack = 0.05;
    const release = 0.08;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(normalizedGain, now + attack);
    gainNode.gain.setValueAtTime(normalizedGain, now + duration - release);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Panning
    if (panner) {
      if (ear === 'right') panner.pan.setValueAtTime(1, now);
      else if (ear === 'left') panner.pan.setValueAtTime(-1, now);
      else panner.pan.setValueAtTime(0, now);

      osc.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(ctx.destination);
    } else {
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
    }

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
}

export function playComplexCochlearFrequency(
  baseFreq: number,
  durationMs = 1200
): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = durationMs / 1000;

    // Fundamental + Harmonics to simulate basilar membrane resonance
    const harmonics = [1, 2, 3];
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    harmonics.forEach((h, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * h, now);
      gain.gain.setValueAtTime(1 / (idx + 1), now);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + duration);
    });
  } catch (e) {
    console.warn('Cochlear sound error:', e);
  }
}
