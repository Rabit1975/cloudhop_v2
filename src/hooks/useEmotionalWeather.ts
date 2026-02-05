import { useEffect, useRef } from 'react';
import { useDeviceAwareAudio, applyDeviceProfile } from './useDeviceAwareAudio';

// Weather texture profiles - each mood has unique filter characteristics
export const weatherProfiles = {
  calm: { freq: 400, drift: 40, resonance: 2 },
  dreamy: { freq: 1200, drift: 200, resonance: 5 },
  intense: { freq: 200, drift: 80, resonance: 8 },
  chaotic: { freq: 800, drift: 400, resonance: 12 },
  ethereal: { freq: 1500, drift: 150, resonance: 3 },
  bloom: { freq: 600, drift: 100, resonance: 4 },
  drift: { freq: 800, drift: 60, resonance: 2 },
  surge: { freq: 300, drift: 120, resonance: 6 },
  storm: { freq: 150, drift: 300, resonance: 10 },
  frost: { freq: 2000, drift: 80, resonance: 1 },
};

// Archetype-based EQ coloration - each archetype shapes the weather
export const archetypeEQ = {
  wanderer: { low: -4, mid: +2, high: +4 },
  circle: { low: +1, mid: +3, high: -1 },
  network: { low: -2, mid: +4, high: +2 },
  stormweave: { low: +4, mid: -1, high: -2 },
  crown: { low: +2, mid: +1, high: +3 },
  action: { low: +3, mid: 0, high: -1 },
  adventure: { low: -2, mid: +2, high: +4 },
  rpg: { low: +1, mid: +3, high: +2 },
  fps: { low: +4, mid: -2, high: -1 },
  strategy: { low: -1, mid: +4, high: +1 },
  default: { low: 0, mid: 0, high: 0 },
};

// Weather texture generator using filtered noise
function playWeather({
  type,
  volume = 0.1,
}: {
  type: keyof typeof weatherProfiles;
  volume?: number;
}) {
  try {
    const ctx = new AudioContext();
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill with noise
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noise.buffer = buffer;

    // Create filter chain for texture shaping
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = weatherProfiles[type].resonance;

    // Create EQ filters for archetype coloration
    const lowShelf = ctx.createBiquadFilter();
    lowShelf.type = 'lowshelf';
    lowShelf.frequency.value = 320;

    const midPeaking = ctx.createBiquadFilter();
    midPeaking.type = 'peaking';
    midPeaking.frequency.value = 1000;
    midPeaking.Q.value = 0.5;

    const highShelf = ctx.createBiquadFilter();
    highShelf.type = 'highshelf';
    highShelf.frequency.value = 3200;

    const gain = ctx.createGain();
    gain.gain.value = volume;

    // Connect the filter chain
    noise.connect(filter);
    filter.connect(lowShelf);
    lowShelf.connect(midPeaking);
    midPeaking.connect(highShelf);
    highShelf.connect(gain);
    gain.connect(ctx.destination);

    noise.loop = true;
    noise.start();

    return { ctx, noise, filter, gain, lowShelf, midPeaking, highShelf };
  } catch (error) {
    console.debug('Weather audio failed:', error);
    return null;
  }
}

// Animate weather filter for organic movement
function animateWeather(
  filter: BiquadFilterNode,
  profile: (typeof weatherProfiles)[keyof typeof weatherProfiles]
) {
  let t = 0;
  let animationId: number;

  function frame() {
    t += 0.002;

    // Create organic filter modulation
    const baseFreq = profile.freq;
    const driftAmount = profile.drift;

    // Complex LFO for natural movement
    const lfo1 = Math.sin(t) * driftAmount;
    const lfo2 = Math.sin(t * 1.7) * driftAmount * 0.3;
    const lfo3 = Math.sin(t * 0.3) * driftAmount * 0.5;

    filter.frequency.value = baseFreq + lfo1 + lfo2 + lfo3;

    animationId = requestAnimationFrame(frame);
  }

  frame();

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

// Apply archetype EQ coloration
function applyArchetypeEQ(
  lowShelf: BiquadFilterNode,
  midPeaking: BiquadFilterNode,
  highShelf: BiquadFilterNode,
  archetype: keyof typeof archetypeEQ
) {
  const eq = archetypeEQ[archetype];

  lowShelf.gain.value = eq.low;
  midPeaking.gain.value = eq.mid;
  highShelf.gain.value = eq.high;
}

// Get archetype from game tags
function getArchetypeFromTags(tags: string[]): keyof typeof archetypeEQ {
  if (!tags || tags.length === 0) return 'default';

  const primaryTag = tags[0].toLowerCase();
  return primaryTag in archetypeEQ ? (primaryTag as keyof typeof archetypeEQ) : 'default';
}

// Presence-based intensity modulation
function calculateWeatherIntensity(presenceCount: number = 1): number {
  return Math.min(1, presenceCount / 50);
}

export function useEmotionalWeather(
  game: any,
  mood: keyof typeof weatherProfiles = 'calm',
  presenceCount: number = 1
) {
  const weatherRef = useRef<ReturnType<typeof playWeather> | null>(null);
  const stopAnimationRef = useRef<(() => void) | null>(null);
  const { deviceProfile, profile } = useDeviceAwareAudio();

  useEffect(() => {
    if (!game || !mood) return;

    // Clean up previous weather
    if (weatherRef.current) {
      weatherRef.current.noise.stop();
      weatherRef.current.ctx.close();
      weatherRef.current = null;
    }

    if (stopAnimationRef.current) {
      stopAnimationRef.current();
      stopAnimationRef.current = null;
    }

    // Start new weather
    const baseVolume = 0.08;
    const intensity = calculateWeatherIntensity(presenceCount);
    const volume = baseVolume * (0.5 + intensity * 0.5) * profile.volume;

    const weather = playWeather({ type: mood, volume });

    if (!weather) return;

    weatherRef.current = weather;

    // Animate the weather
    const weatherProfile = weatherProfiles[mood];
    stopAnimationRef.current = animateWeather(weather.filter, weatherProfile);

    // Apply archetype coloration with device profile
    const archetype = getArchetypeFromTags(game.tags);
    const baseEQ = archetypeEQ[archetype];

    // Apply device-aware EQ adjustments
    applyDeviceProfile(weather, deviceProfile, baseEQ);

    // Additional device-specific weather adjustments
    weather.filter.Q.value = weatherProfile.resonance * profile.width;

    return () => {
      if (weatherRef.current) {
        weatherRef.current.noise.stop();
        weatherRef.current.ctx.close();
        weatherRef.current = null;
      }

      if (stopAnimationRef.current) {
        stopAnimationRef.current();
        stopAnimationRef.current = null;
      }
    };
  }, [game, mood, presenceCount, deviceProfile, profile]);
}
