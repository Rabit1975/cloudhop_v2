// CloudHop Haptic Echo Engine
// Emotional tactility system for subtle star acknowledgments
// This creates emotional resonance, not mechanical vibrations

import { useRef, useEffect } from 'react';

// Haptic profiles for different events - each has unique duration and intensity
export const hapticProfiles = {
  hoverStar: { duration: 8, intensity: 0.1 },
  recenterStar: { duration: 20, intensity: 0.25 },
  constellationDrift: { duration: 4, intensity: 0.05 },
  launchStrikeForce: { duration: 35, intensity: 0.4 },
  emotionalShift: { duration: 15, intensity: 0.2 },
  skyPulse: { duration: 12, intensity: 0.15 },
  nebulaBloom: { duration: 6, intensity: 0.08 },
  constellationConnect: { duration: 10, intensity: 0.12 },
} as const;

type HapticType = keyof typeof hapticProfiles;

// Archetype-based haptic intensity bias - each archetype subtly alters the feel
export const archetypeHapticBias = {
  wanderer: 0.9, // Soft, exploratory feel
  circle: 1.0, // Balanced, communal feel
  network: 1.1, // Connected, digital feel
  stormweave: 1.2, // Dynamic, energetic feel
  crown: 1.3, // Majestic, premium feel
  action: 1.2, // Energetic, engaging feel
  adventure: 0.9, // Exploratory, discovery feel
  rpg: 1.1, // Immersive, story feel
  fps: 1.2, // Intense, focused feel
  strategy: 1.0, // Thoughtful, planning feel
  default: 1.0, // Neutral, balanced feel
} as const;

// Detect haptic capability - only activate on supported devices
export const supportsHaptics = 'vibrate' in navigator || (window.navigator as any).haptics?.impact;

// Get archetype from game tags
function getArchetypeFromTags(tags: string[]): keyof typeof archetypeHapticBias {
  if (!tags || tags.length === 0) return 'default';

  const primaryTag = tags[0].toLowerCase();
  return primaryTag in archetypeHapticBias
    ? (primaryTag as keyof typeof archetypeHapticBias)
    : 'default';
}

// The unified haptic engine - creates emotional tactility
export function hapticEcho(type: HapticType, game?: any) {
  if (!supportsHaptics) return;

  const profile = hapticProfiles[type];
  if (!profile) return;

  // Apply archetype-based intensity bias if game is provided
  let intensity = profile.intensity;
  if (game) {
    const archetype = getArchetypeFromTags(game.tags);
    intensity *= archetypeHapticBias[archetype];
  }

  // Standard vibration API (most Android devices, some desktop browsers)
  if ('vibrate' in navigator) {
    // Convert intensity to vibration pattern
    // Higher intensity = longer vibration
    const vibrationDuration = Math.max(1, Math.floor(profile.duration * intensity));
    navigator.vibrate(vibrationDuration);
  }

  // Advanced haptics API (iOS 13+, some Android devices with precision haptics)
  const haptics = (window.navigator as any).haptics;
  if (haptics?.impact) {
    haptics.impact({
      style: 'light',
      intensity: Math.min(1.0, intensity),
    });
  }

  // For devices with gamepad haptics (future enhancement)
  const gamepads = navigator.getGamepads?.();
  if (gamepads) {
    for (const gamepad of gamepads) {
      if (gamepad?.vibrationActuator) {
        try {
          // Use the correct API for gamepad haptics
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: profile.duration,
            strongMagnitude: intensity,
            weakMagnitude: intensity * 0.5,
          });
        } catch (error) {
          // Fallback for older gamepad APIs
          console.debug('Gamepad haptics not supported:', error);
        }
      }
    }
  }
}

// Specialized haptic functions for common events
export function hapticHoverStar(game?: any) {
  hapticEcho('hoverStar', game);
}

export function hapticRecenterStar(game?: any) {
  hapticEcho('recenterStar', game);
}

export function hapticConstellationDrift() {
  hapticEcho('constellationDrift');
}

export function hapticLaunchStrikeForce(game?: any) {
  hapticEcho('launchStrikeForce', game);
}

export function hapticEmotionalShift(game?: any) {
  hapticEcho('emotionalShift', game);
}

export function hapticSkyPulse(game?: any) {
  hapticEcho('skyPulse', game);
}

export function hapticNebulaBloom(game?: any) {
  hapticEcho('nebulaBloom', game);
}

export function hapticConstellationConnect(game?: any) {
  hapticEcho('constellationConnect', game);
}

// Ambient haptic system for constellation drift
export function useAmbientHaptics(isActive: boolean = true) {
  const lastDriftHaptic = useRef<number>(0);

  useEffect(() => {
    if (!isActive || !supportsHaptics) return;

    const interval = setInterval(() => {
      // Very subtle random haptic pulses (0.2% chance per interval)
      if (Math.random() < 0.002) {
        hapticConstellationDrift();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);
}

// Emotional haptic response to mood changes
export function useEmotionalHaptics(currentMood: string, game?: any) {
  const previousMoodRef = useRef<string>(currentMood);

  useEffect(() => {
    if (currentMood !== previousMoodRef.current) {
      hapticEmotionalShift(game);
      previousMoodRef.current = currentMood;
    }
  }, [currentMood, game]);
}

// Haptic feedback for constellation connections
export function hapticConstellationLineDraw(fromGame: any, toGame: any) {
  if (!supportsHaptics) return;

  // Create a subtle pulse that travels from one star to another
  hapticConstellationConnect(fromGame);

  setTimeout(() => {
    hapticConstellationConnect(toGame);
  }, 100);
}
