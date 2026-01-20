import { MusicTrack } from '../MusicState'
import { InfluenceProfile, MoodType, IntensityLevel } from './InfluenceProfiles'

export interface TrackAnalysis {
  mood: MoodType
  intensity: IntensityLevel
  tempo: number
  energy: number
}

export function analyzeTrack(track: MusicTrack): TrackAnalysis {
  // Simple heuristic-based analysis
  // In production, this could use audio analysis APIs
  
  const duration = track.duration
  const titleLower = track.title.toLowerCase()
  
  // Analyze mood from title keywords
  let mood: MoodType = 'neutral'
  if (titleLower.includes('calm') || titleLower.includes('relax') || titleLower.includes('chill')) {
    mood = 'calm'
  } else if (titleLower.includes('energy') || titleLower.includes('hype') || titleLower.includes('pump')) {
    mood = 'energetic'
  } else if (titleLower.includes('dark') || titleLower.includes('heavy') || titleLower.includes('intense')) {
    mood = 'dark'
  } else if (titleLower.includes('bright') || titleLower.includes('happy') || titleLower.includes('upbeat')) {
    mood = 'bright'
  }
  
  // Analyze intensity (simple heuristic)
  let intensity: IntensityLevel = 'medium'
  if (duration < 180) {
    intensity = 'high' // Short tracks tend to be high energy
  } else if (duration > 300) {
    intensity = 'low' // Long tracks tend to be more ambient
  }
  
  // Estimate tempo (rough guess)
  const tempo = mood === 'calm' ? 80 : mood === 'energetic' ? 140 : 120
  
  // Estimate energy
  const energy = mood === 'calm' ? 0.3 : mood === 'energetic' ? 0.9 : 0.5
  
  return {
    mood,
    intensity,
    tempo,
    energy
  }
}

export function profileFromAnalysis(analysis: TrackAnalysis): InfluenceProfile {
  return {
    mood: analysis.mood,
    intensity: analysis.intensity,
    tempo: analysis.tempo,
    energy: analysis.energy
  }
}
