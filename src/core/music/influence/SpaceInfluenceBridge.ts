import { InfluenceProfile } from './InfluenceProfiles'

export interface SpaceTheme {
  primaryColor: string
  secondaryColor: string
  ambientIntensity: number
  particleCount: number
}

export function applySpaceInfluence(profile: InfluenceProfile): SpaceTheme {
  // Map music influence to space theme
  const { mood, intensity, energy } = profile

  let primaryColor = '#3498db'
  let secondaryColor = '#2ecc71'

  switch (mood) {
    case 'energetic':
      primaryColor = '#e74c3c'
      secondaryColor = '#f39c12'
      break
    case 'calm':
      primaryColor = '#3498db'
      secondaryColor = '#9b59b6'
      break
    case 'dark':
      primaryColor = '#2c3e50'
      secondaryColor = '#34495e'
      break
    case 'bright':
      primaryColor = '#f1c40f'
      secondaryColor = '#e67e22'
      break
    case 'neutral':
    default:
      primaryColor = '#3498db'
      secondaryColor = '#2ecc71'
  }

  const ambientIntensity = energy
  const particleCount = intensity === 'high' ? 200 : intensity === 'medium' ? 100 : 50

  return {
    primaryColor,
    secondaryColor,
    ambientIntensity,
    particleCount
  }
}

export function getThemeForMood(mood: string): Partial<SpaceTheme> {
  const profile: InfluenceProfile = {
    mood: mood as any,
    intensity: 'medium',
    tempo: 120,
    energy: 0.5
  }
  return applySpaceInfluence(profile)
}
