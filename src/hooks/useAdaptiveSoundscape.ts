import { useEffect, useRef } from 'react';
import { useDeviceAwareAudio } from './useDeviceAwareAudio';

// Archetype harmonic palette - each has base frequency + overtone + tone color
export const archetypeHarmonics = {
  wanderer: { base: 320, overtone: 640, color: 'airy' },
  circle: { base: 420, overtone: 840, color: 'warm' },
  network: { base: 510, overtone: 1020, color: 'glassy' },
  stormweave: { base: 580, overtone: 1160, color: 'electric' },
  crown: { base: 660, overtone: 1320, color: 'golden' },
  action: { base: 420, overtone: 840, color: 'energetic' },
  adventure: { base: 320, overtone: 640, color: 'exploratory' },
  rpg: { base: 510, overtone: 1020, color: 'immersive' },
  fps: { base: 580, overtone: 1160, color: 'focused' },
  strategy: { base: 660, overtone: 1320, color: 'thoughtful' },
  default: { base: 440, overtone: 880, color: 'neutral' },
};

// Mood temporal patterns - how sound moves through time
export const moodPatterns = {
  calm: { interval: 6000, drift: 0.1, volume: 0.05 },
  dreamy: { interval: 8000, drift: 0.2, volume: 0.07 },
  intense: { interval: 3000, drift: 0.3, volume: 0.1 },
  chaotic: { interval: 1500, drift: 0.5, volume: 0.12 },
  ethereal: { interval: 9000, drift: 0.15, volume: 0.06 },
  bloom: { interval: 4000, drift: 0.25, volume: 0.08 },
  drift: { interval: 7000, drift: 0.12, volume: 0.06 },
  surge: { interval: 2500, drift: 0.35, volume: 0.11 },
  storm: { interval: 2000, drift: 0.4, volume: 0.12 },
  frost: { interval: 8500, drift: 0.08, volume: 0.05 },
};

// Enhanced tone player with spatial audio
function playSpatialTone(freq = 440, duration = 0.6, volume = 0.1, pan = 0) {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panNode = ctx.createStereoPanner();

    osc.frequency.value = freq;
    osc.type = 'sine';

    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    panNode.pan.value = pan;

    osc.connect(panNode);
    panNode.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.debug('Spatial audio playback failed:', error);
  }
}

// Play harmonic tone with spatial positioning
function playHarmonicSpatialTone(baseFreq = 440, duration = 0.6, volume = 0.1, pan = 0) {
  // Play fundamental frequency
  playSpatialTone(baseFreq, duration, volume, pan);

  // Add harmonic overtone for celestial shimmer
  setTimeout(() => {
    playSpatialTone(baseFreq * 2, duration * 0.8, volume * 0.5, pan);
  }, 50);
}

// Get archetype from game tags
function getArchetypeFromTags(tags: string[]): keyof typeof archetypeHarmonics {
  if (!tags || tags.length === 0) return 'default';

  const primaryTag = tags[0].toLowerCase();
  return primaryTag in archetypeHarmonics
    ? (primaryTag as keyof typeof archetypeHarmonics)
    : 'default';
}

// Presence-based intensity modulation
function calculateIntensity(presenceCount: number = 1): number {
  return Math.min(1, presenceCount / 50);
}

export function useAdaptiveSoundscape(
  game: any,
  mood: keyof typeof moodPatterns = 'calm',
  presenceCount: number = 1
) {
  const activeRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { playHarmonicTone, deviceProfile, profile } = useDeviceAwareAudio();

  useEffect(() => {
    if (!game || !mood) return;

    const archetype = getArchetypeFromTags(game.tags);
    const { base, overtone } = archetypeHarmonics[archetype];
    const { interval, drift, volume: baseVolume } = moodPatterns[mood];

    // Modulate intensity based on presence
    const intensity = calculateIntensity(presenceCount);
    const volume = baseVolume * (0.5 + intensity * 0.5);
    const driftAmount = drift * (0.5 + intensity * 0.5) * profile.driftAmount;

    function loop() {
      if (!activeRef.current) return;

      // Create drifting frequency
      const drifted = base + (Math.random() - 0.5) * driftAmount * 100;

      // Random spatial positioning for 3D effect
      const pan = (Math.random() - 0.5) * 0.8 * profile.width; // Scale by device width

      // Play device-aware harmonic spatial tone
      playHarmonicTone(drifted, 0.6, volume, pan);

      // Schedule next tone with variation
      const nextInterval = interval + Math.random() * interval * 0.3;
      timeoutRef.current = setTimeout(loop, nextInterval);
    }

    // Start the soundscape
    loop();

    return () => {
      activeRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [game, mood, presenceCount, playHarmonicTone, deviceProfile, profile]);
}
