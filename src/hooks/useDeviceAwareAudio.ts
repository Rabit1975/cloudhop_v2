import { useState, useEffect } from 'react';

// Device sound profiles - each shapes the audio experience
export const deviceProfiles = {
  'desktop-speakers': {
    width: 1.0,
    bass: +3,
    mid: 0,
    treble: +2,
    reverb: 0.4,
    volume: 1.0,
    harmonicRichness: 1.0,
    driftAmount: 1.0,
  },
  'desktop-headphones': {
    width: 0.8,
    bass: +1,
    mid: +1,
    treble: +1,
    reverb: 0.2,
    volume: 0.8,
    harmonicRichness: 1.2,
    driftAmount: 0.8,
  },
  'mobile-speakers': {
    width: 0.4,
    bass: -3,
    mid: +2,
    treble: -1,
    reverb: 0.1,
    volume: 0.6,
    harmonicRichness: 0.6,
    driftAmount: 0.5,
  },
  'mobile-headphones': {
    width: 0.6,
    bass: -1,
    mid: +1,
    treble: +2,
    reverb: 0.15,
    volume: 0.7,
    harmonicRichness: 1.1,
    driftAmount: 0.7,
  },
} as const;

type DeviceProfile = keyof typeof deviceProfiles;

// Detect device type with heuristics
function getDeviceProfile(): DeviceProfile {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const isHeadphones =
    navigator.userAgent.includes('Headset') ||
    navigator.userAgent.includes('Earbuds') ||
    navigator.userAgent.includes('AirPods') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    // Additional heuristics for headphone detection
    (navigator as any).mediaDevices
      ?.enumerateDevices?.()
      .then((devices: any[]) => {
        return devices.some(
          (device: any) =>
            device.kind === 'audiooutput' &&
            (device.label.includes('Headphone') || device.label.includes('Earphone'))
        );
      })
      .catch(() => false);

  if (isMobile && isHeadphones) return 'mobile-headphones';
  if (isMobile) return 'mobile-speakers';
  if (isHeadphones) return 'desktop-headphones';
  return 'desktop-speakers';
}

// Generate reverb impulse response
function generateReverbImpulse(duration: number, decay: number): AudioBuffer {
  const ctx = new AudioContext();
  const length = ctx.sampleRate * duration;
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }

  return impulse;
}

// Apply device profile to audio nodes
export function applyDeviceProfile(
  audioNodes: {
    gain?: GainNode;
    filter?: BiquadFilterNode;
    lowShelf?: BiquadFilterNode;
    midPeaking?: BiquadFilterNode;
    highShelf?: BiquadFilterNode;
    stereoPanner?: StereoPannerNode;
  },
  profile: DeviceProfile,
  baseEQ: { low: number; mid: number; high: number }
) {
  const deviceProfile = deviceProfiles[profile];

  // Apply volume scaling
  if (audioNodes.gain) {
    audioNodes.gain.gain.value *= deviceProfile.volume;
  }

  // Apply filter width/resonance
  if (audioNodes.filter) {
    audioNodes.filter.Q.value = deviceProfile.width * 10;
  }

  // Apply EQ with device profile adjustments
  if (audioNodes.lowShelf) {
    audioNodes.lowShelf.gain.value = baseEQ.low + deviceProfile.bass;
  }
  if (audioNodes.midPeaking) {
    audioNodes.midPeaking.gain.value = baseEQ.mid + deviceProfile.mid;
  }
  if (audioNodes.highShelf) {
    audioNodes.highShelf.gain.value = baseEQ.high + deviceProfile.treble;
  }

  // Apply stereo width
  if (audioNodes.stereoPanner) {
    // The pan value will be multiplied by device width when set
    (audioNodes.stereoPanner as any).deviceWidth = deviceProfile.width;
  }
}

// Enhanced spatial panner with device awareness
export function createDeviceAwareStereoPanner(
  ctx: AudioContext,
  deviceProfile: DeviceProfile
): StereoPannerNode {
  const panNode = ctx.createStereoPanner();
  const profile = deviceProfiles[deviceProfile];

  // Store device width for later use
  (panNode as any).deviceWidth = profile.width;

  return panNode;
}

// Device-aware tone player
export function playDeviceAwareTone(
  freq: number,
  duration: number,
  volume: number,
  pan: number,
  deviceProfile: DeviceProfile
) {
  try {
    const ctx = new AudioContext();
    const profile = deviceProfiles[deviceProfile];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panNode = createDeviceAwareStereoPanner(ctx, deviceProfile);

    // Apply device profile to frequency
    const adjustedFreq = freq + profile.bass * 2;
    osc.frequency.value = adjustedFreq;
    osc.type = 'sine';

    // Apply device volume
    const adjustedVolume = volume * profile.volume;
    gain.gain.value = adjustedVolume;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    // Apply device-aware stereo width
    const adjustedPan = pan * profile.width;
    panNode.pan.value = Math.max(-1, Math.min(1, adjustedPan));

    // Add reverb for desktop speakers
    if (profile.reverb > 0.2) {
      const reverb = ctx.createConvolver();
      reverb.buffer = generateReverbImpulse(2.0, profile.reverb * 2);

      const wetGain = ctx.createGain();
      wetGain.gain.value = profile.reverb;

      const dryGain = ctx.createGain();
      dryGain.gain.value = 1 - profile.reverb;

      osc.connect(panNode);
      panNode.connect(dryGain);
      panNode.connect(reverb);
      dryGain.connect(gain);
      reverb.connect(wetGain);
      wetGain.connect(gain);
    } else {
      osc.connect(panNode);
      panNode.connect(gain);
    }

    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.debug('Device-aware audio failed:', error);
  }
}

// Device-aware harmonic tone with richness control
export function playDeviceAwareHarmonicTone(
  baseFreq: number,
  duration: number,
  volume: number,
  pan: number,
  deviceProfile: DeviceProfile
) {
  const profile = deviceProfiles[deviceProfile];

  // Play fundamental frequency
  playDeviceAwareTone(baseFreq, duration, volume, pan, deviceProfile);

  // Add harmonic overtone based on device profile
  if (profile.harmonicRichness > 0.8) {
    setTimeout(() => {
      playDeviceAwareTone(
        baseFreq * 2,
        duration * 0.8,
        volume * 0.5 * profile.harmonicRichness,
        pan,
        deviceProfile
      );
    }, 50);
  }

  // Add third harmonic for rich devices
  if (profile.harmonicRichness > 1.0) {
    setTimeout(() => {
      playDeviceAwareTone(
        baseFreq * 3,
        duration * 0.6,
        volume * 0.3 * profile.harmonicRichness,
        pan,
        deviceProfile
      );
    }, 100);
  }
}

// Hook for device-aware audio
export function useDeviceAwareAudio() {
  const [deviceProfile, setDeviceProfile] = useState<DeviceProfile>(getDeviceProfile);

  useEffect(() => {
    const handleDeviceChange = () => {
      const newProfile = getDeviceProfile();
      if (newProfile !== deviceProfile) {
        setDeviceProfile(newProfile);
      }
    };

    // Listen for device changes
    window.addEventListener('devicechange', handleDeviceChange);

    // Also check periodically for more reliable detection
    const interval = setInterval(handleDeviceChange, 5000);

    return () => {
      window.removeEventListener('devicechange', handleDeviceChange);
      clearInterval(interval);
    };
  }, [deviceProfile]);

  return {
    deviceProfile,
    profile: deviceProfiles[deviceProfile],
    playTone: (freq: number, duration: number, volume: number, pan: number = 0) =>
      playDeviceAwareTone(freq, duration, volume, pan, deviceProfile),
    playHarmonicTone: (baseFreq: number, duration: number, volume: number, pan: number = 0) =>
      playDeviceAwareHarmonicTone(baseFreq, duration, volume, pan, deviceProfile),
    applyProfile: (audioNodes: any, baseEQ: { low: number; mid: number; high: number }) =>
      applyDeviceProfile(audioNodes, deviceProfile, baseEQ),
  };
}
