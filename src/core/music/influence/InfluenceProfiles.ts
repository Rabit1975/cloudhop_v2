export type MoodType = 'energetic' | 'calm' | 'dark' | 'bright' | 'neutral'
export type IntensityLevel = 'low' | 'medium' | 'high'

export interface InfluenceProfile {
  mood: MoodType
  intensity: IntensityLevel
  tempo: number // BPM
  energy: number // 0-1
}

export const defaultInfluenceProfile: InfluenceProfile = {
  mood: 'neutral',
  intensity: 'medium',
  tempo: 120,
  energy: 0.5
}

export const moodProfiles: Record<MoodType, Partial<InfluenceProfile>> = {
  energetic: { intensity: 'high', tempo: 140, energy: 0.9 },
  calm: { intensity: 'low', tempo: 80, energy: 0.3 },
  dark: { intensity: 'medium', tempo: 100, energy: 0.6 },
  bright: { intensity: 'medium', tempo: 130, energy: 0.7 },
  neutral: { intensity: 'medium', tempo: 120, energy: 0.5 }
}
