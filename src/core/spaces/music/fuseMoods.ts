// fuseMoods - Combines Music, Space, and Theme influences into a unified emotional state

import { MoodDefinition, MoodPalette, findClosestMood, blendMoods, MoodColor } from '../../music/influence/MoodPalette'

export interface MusicInfluence {
  valence: number
  arousal: number
  dominance: number
  weight: number
}

export interface SpaceInfluence {
  type: 'nebula' | 'void' | 'cluster' | 'gateway'
  intensity: number
  weight: number
}

export interface ThemeInfluence {
  isDarkMode: boolean
  accentColor: string
  weight: number
}

export interface LeonardoInfluence {
  glyphActive: boolean
  resonance: number
  weight: number
}

export interface FusedMood {
  primaryMood: MoodDefinition
  secondaryMood?: MoodDefinition
  blendedColors: MoodColor
  emotionalState: {
    valence: number
    arousal: number
    dominance: number
  }
  influences: Array<{
    name: string
    weight: number
    color: string
  }>
}

// Map space types to moods
const spaceTypeMoodMap: Record<SpaceInfluence['type'], keyof typeof MoodPalette> = {
  nebula: 'mysterious',
  void: 'calm',
  cluster: 'energetic',
  gateway: 'powerful'
}

export function fuseMoods(
  music?: MusicInfluence,
  space?: SpaceInfluence,
  theme?: ThemeInfluence,
  leonardo?: LeonardoInfluence
): FusedMood {
  const influences: Array<{ name: string; weight: number; color: string }> = []
  const moodWeights: Array<{ mood: MoodDefinition; weight: number }> = []

  let totalValence = 0
  let totalArousal = 0
  let totalDominance = 0
  let totalWeight = 0

  // Process music influence
  if (music && music.weight > 0) {
    const musicMood = findClosestMood(music.valence, music.arousal, music.dominance)
    moodWeights.push({ mood: musicMood, weight: music.weight })
    
    totalValence += music.valence * music.weight
    totalArousal += music.arousal * music.weight
    totalDominance += music.dominance * music.weight
    totalWeight += music.weight

    influences.push({
      name: 'Music',
      weight: music.weight,
      color: musicMood.colors.primary
    })
  }

  // Process space influence
  if (space && space.weight > 0) {
    const spaceMoodKey = spaceTypeMoodMap[space.type]
    const spaceMood = MoodPalette[spaceMoodKey]
    moodWeights.push({ mood: spaceMood, weight: space.weight * space.intensity })

    totalValence += spaceMood.valence * space.weight * space.intensity
    totalArousal += spaceMood.arousal * space.weight * space.intensity
    totalDominance += spaceMood.dominance * space.weight * space.intensity
    totalWeight += space.weight * space.intensity

    influences.push({
      name: `Space (${space.type})`,
      weight: space.weight * space.intensity,
      color: spaceMood.colors.primary
    })
  }

  // Process theme influence
  if (theme && theme.weight > 0) {
    const themeMood = theme.isDarkMode ? MoodPalette.mysterious : MoodPalette.joyful
    moodWeights.push({ mood: themeMood, weight: theme.weight * 0.5 })

    totalValence += themeMood.valence * theme.weight * 0.5
    totalArousal += themeMood.arousal * theme.weight * 0.5
    totalDominance += themeMood.dominance * theme.weight * 0.5
    totalWeight += theme.weight * 0.5

    influences.push({
      name: 'Theme',
      weight: theme.weight * 0.5,
      color: theme.accentColor
    })
  }

  // Process Leonardo influence
  if (leonardo && leonardo.weight > 0 && leonardo.glyphActive) {
    const leonardoMood = MoodPalette.powerful
    const leonardoWeight = leonardo.weight * leonardo.resonance
    moodWeights.push({ mood: leonardoMood, weight: leonardoWeight })

    totalValence += leonardoMood.valence * leonardoWeight
    totalArousal += leonardoMood.arousal * leonardoWeight
    totalDominance += leonardoMood.dominance * leonardoWeight
    totalWeight += leonardoWeight

    influences.push({
      name: 'Leonardo',
      weight: leonardoWeight,
      color: leonardoMood.colors.glow
    })
  }

  // Calculate averaged emotional state
  const emotionalState = totalWeight > 0
    ? {
        valence: totalValence / totalWeight,
        arousal: totalArousal / totalWeight,
        dominance: totalDominance / totalWeight
      }
    : { valence: 0.5, arousal: 0.5, dominance: 0.5 }

  // Find primary and secondary moods
  const sortedMoods = [...moodWeights].sort((a, b) => b.weight - a.weight)
  const primaryMood = sortedMoods[0]?.mood || MoodPalette.calm
  const secondaryMood = sortedMoods[1]?.mood

  // Blend colors
  const blendedColors = moodWeights.length > 0
    ? blendMoods(moodWeights)
    : primaryMood.colors

  return {
    primaryMood,
    secondaryMood,
    blendedColors,
    emotionalState,
    influences
  }
}
