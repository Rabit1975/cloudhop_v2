import { useEffect, useRef } from 'react'
import { useMusicState, selectCurrentTrack, selectIsPlaying } from '../MusicState'
import { InfluenceScheduler } from './InfluenceScheduler'
import { analyzeTrack, profileFromAnalysis } from './TrackAnalyzer'
import { InfluenceProfile } from './InfluenceProfiles'

export interface MusicInfluenceOptions {
  onInfluence?: (profile: InfluenceProfile) => void
  updateInterval?: number
  enabled?: boolean
}

export function useMusicInfluenceEngine(options: MusicInfluenceOptions = {}) {
  const { onInfluence, updateInterval = 5000, enabled = true } = options
  const currentTrack = useMusicState(selectCurrentTrack)
  const isPlaying = useMusicState(selectIsPlaying)
  const schedulerRef = useRef<InfluenceScheduler | null>(null)

  useEffect(() => {
    if (!enabled || !onInfluence) {
      return
    }

    // Initialize scheduler
    if (!schedulerRef.current) {
      schedulerRef.current = new InfluenceScheduler(updateInterval)
    }

    const scheduler = schedulerRef.current

    // Apply influence when track changes and is playing
    if (currentTrack && isPlaying) {
      const analysis = analyzeTrack(currentTrack)
      const profile = profileFromAnalysis(analysis)
      
      if (!scheduler.isRunning()) {
        scheduler.start(onInfluence, profile)
      } else {
        scheduler.updateProfile(profile)
      }
    } else {
      // Stop influence when not playing
      scheduler.stop()
    }

    return () => {
      if (schedulerRef.current) {
        schedulerRef.current.stop()
      }
    }
  }, [currentTrack, isPlaying, onInfluence, updateInterval, enabled])

  return {
    isActive: schedulerRef.current?.isRunning() ?? false
  }
}
