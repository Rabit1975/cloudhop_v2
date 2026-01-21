// MoodPalette - Color and visual influence system for emotional states

export interface MoodColor {
  primary: string
  secondary: string
  accent: string
  glow: string
}

export interface MoodDefinition {
  name: string
  colors: MoodColor
  valence: number // -1 (negative) to 1 (positive)
  arousal: number // 0 (calm) to 1 (excited)
  dominance: number // 0 (submissive) to 1 (dominant)
}

export const MoodPalette: Record<string, MoodDefinition> = {
  joyful: {
    name: 'Joyful',
    colors: {
      primary: '#FFD700',
      secondary: '#FFA500',
      accent: '#FF6B6B',
      glow: '#FFED4E'
    },
    valence: 0.9,
    arousal: 0.8,
    dominance: 0.7
  },
  
  energetic: {
    name: 'Energetic',
    colors: {
      primary: '#FF3B30',
      secondary: '#FF9500',
      accent: '#FF2D92',
      glow: '#FF5733'
    },
    valence: 0.7,
    arousal: 0.95,
    dominance: 0.8
  },
  
  peaceful: {
    name: 'Peaceful',
    colors: {
      primary: '#5AC8FA',
      secondary: '#4FC3F7',
      accent: '#81D4FA',
      glow: '#7DD3FC'
    },
    valence: 0.6,
    arousal: 0.2,
    dominance: 0.4
  },
  
  melancholic: {
    name: 'Melancholic',
    colors: {
      primary: '#5856D6',
      secondary: '#AF52DE',
      accent: '#7C7CDD',
      glow: '#8B87FF'
    },
    valence: -0.3,
    arousal: 0.3,
    dominance: 0.3
  },
  
  intense: {
    name: 'Intense',
    colors: {
      primary: '#FF2D55',
      secondary: '#FF375F',
      accent: '#FF1744',
      glow: '#FF4081'
    },
    valence: 0.3,
    arousal: 0.9,
    dominance: 0.9
  },
  
  calm: {
    name: 'Calm',
    colors: {
      primary: '#34C759',
      secondary: '#00C853',
      accent: '#69F0AE',
      glow: '#64FFDA'
    },
    valence: 0.5,
    arousal: 0.1,
    dominance: 0.5
  },
  
  mysterious: {
    name: 'Mysterious',
    colors: {
      primary: '#8E44AD',
      secondary: '#9B59B6',
      accent: '#BB86FC',
      glow: '#BA68C8'
    },
    valence: 0.1,
    arousal: 0.5,
    dominance: 0.6
  },
  
  powerful: {
    name: 'Powerful',
    colors: {
      primary: '#D32F2F',
      secondary: '#F44336',
      accent: '#FF5252',
      glow: '#FF6E40'
    },
    valence: 0.4,
    arousal: 0.7,
    dominance: 0.95
  }
}

// Helper function to find the closest mood based on emotional state
export function findClosestMood(
  valence: number,
  arousal: number,
  dominance: number
): MoodDefinition {
  let closestMood = MoodPalette.joyful
  let minDistance = Infinity

  Object.values(MoodPalette).forEach(mood => {
    const distance = Math.sqrt(
      Math.pow(mood.valence - valence, 2) +
      Math.pow(mood.arousal - arousal, 2) +
      Math.pow(mood.dominance - dominance, 2)
    )

    if (distance < minDistance) {
      minDistance = distance
      closestMood = mood
    }
  })

  return closestMood
}

// Helper function to interpolate between two colors
export function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = parseInt(color1.slice(1), 16)
  const c2 = parseInt(color2.slice(1), 16)

  const r1 = (c1 >> 16) & 0xff
  const g1 = (c1 >> 8) & 0xff
  const b1 = c1 & 0xff

  const r2 = (c2 >> 16) & 0xff
  const g2 = (c2 >> 8) & 0xff
  const b2 = c2 & 0xff

  const r = Math.round(r1 + (r2 - r1) * factor)
  const g = Math.round(g1 + (g2 - g1) * factor)
  const b = Math.round(b1 + (b2 - b1) * factor)

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

// Helper function to blend multiple moods
export function blendMoods(moods: Array<{ mood: MoodDefinition; weight: number }>): MoodColor {
  const totalWeight = moods.reduce((sum, m) => sum + m.weight, 0)
  
  if (totalWeight === 0) return MoodPalette.joyful.colors

  const blended: MoodColor = {
    primary: '#000000',
    secondary: '#000000',
    accent: '#000000',
    glow: '#000000'
  }

  // Simple average for demonstration (could be improved with proper color space blending)
  moods.forEach(({ mood, weight }) => {
    const factor = weight / totalWeight
    blended.primary = interpolateColor(blended.primary, mood.colors.primary, factor)
    blended.secondary = interpolateColor(blended.secondary, mood.colors.secondary, factor)
    blended.accent = interpolateColor(blended.accent, mood.colors.accent, factor)
    blended.glow = interpolateColor(blended.glow, mood.colors.glow, factor)
  })

  return blended
}
