// CloudHop Celestial Audio Engine
// Zero-dependency, pure generative audio for mythic UI interactions
// Now with device-aware audio profiling

import { useDeviceAwareAudio } from '../hooks/useDeviceAwareAudio';

export function playTone(freq = 440, duration = 0.2, volume = 0.2) {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = freq;
    osc.type = 'sine';

    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    // Silently fail if audio context is not supported
    console.debug('Audio playback failed:', error);
  }
}

export function playHarmonicTone(baseFreq = 440, duration = 0.2, volume = 0.2) {
  // Play fundamental frequency
  playTone(baseFreq, duration, volume);

  // Add harmonic overtone for celestial shimmer
  setTimeout(() => {
    playTone(baseFreq * 2, duration * 0.8, volume * 0.25);
  }, 50);
}

export function playConstellationChime(freq = 440) {
  // Soft, quick chime for hover interactions
  playHarmonicTone(freq, 0.15, 0.12);
}

export function playConstellationResonance(freq = 440) {
  // Deeper, slower tone for recentering
  playHarmonicTone(freq - 80, 0.3, 0.2);
}

export function playSkyPulse(freq = 440) {
  // Ceremonial entrance tone for modal opening
  playHarmonicTone(freq, 0.4, 0.1);
}

// Device-aware versions of the same functions
export function playDeviceAwareConstellationChime(freq = 440, pan = 0) {
  const { playHarmonicTone } = useDeviceAwareAudio();
  playHarmonicTone(freq, 0.15, 0.12, pan);
}

export function playDeviceAwareConstellationResonance(freq = 440, pan = 0) {
  const { playHarmonicTone } = useDeviceAwareAudio();
  playHarmonicTone(freq - 80, 0.3, 0.2, pan);
}

export function playDeviceAwareSkyPulse(freq = 440, pan = 0) {
  const { playHarmonicTone } = useDeviceAwareAudio();
  playHarmonicTone(freq, 0.4, 0.1, pan);
}

// Archetype-based sound palette - each constellation has its own "voice"
export const archetypeTones = {
  wanderer: 420, // Soft, exploratory tone
  circle: 520, // Warm, communal tone
  network: 610, // Connected, digital tone
  stormweave: 680, // Dynamic, energetic tone
  crown: 760, // Regal, majestic tone
  action: 520, // Energetic, engaging tone
  adventure: 420, // Exploratory, discovery tone
  rpg: 610, // Immersive, story tone
  fps: 680, // Intense, focused tone
  strategy: 760, // Thoughtful, planning tone
  default: 440, // Neutral, celestial tone
};

export function getArchetypeTone(tags: string[]): number {
  if (!tags || tags.length === 0) return archetypeTones.default;

  const primaryTag = tags[0].toLowerCase();
  return archetypeTones[primaryTag as keyof typeof archetypeTones] || archetypeTones.default;
}
