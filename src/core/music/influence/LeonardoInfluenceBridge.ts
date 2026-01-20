import { InfluenceProfile } from './InfluenceProfiles'

export interface LeonardoPromptContext {
  mood: string
  intensity: string
  tempo: number
  energy: number
  suggestedStyle: string
}

export function createLeonardoContext(profile: InfluenceProfile): LeonardoPromptContext {
  const { mood, intensity, tempo, energy } = profile

  let suggestedStyle = 'cinematic'

  switch (mood) {
    case 'energetic':
      suggestedStyle = 'dynamic and vibrant'
      break
    case 'calm':
      suggestedStyle = 'peaceful and serene'
      break
    case 'dark':
      suggestedStyle = 'dramatic and moody'
      break
    case 'bright':
      suggestedStyle = 'colorful and cheerful'
      break
    case 'neutral':
    default:
      suggestedStyle = 'balanced and harmonious'
  }

  return {
    mood,
    intensity,
    tempo,
    energy,
    suggestedStyle
  }
}

export function enrichPromptWithMusic(
  basePrompt: string,
  profile: InfluenceProfile
): string {
  const context = createLeonardoContext(profile)
  return `${basePrompt}, ${context.suggestedStyle} style, ${context.mood} mood`
}
