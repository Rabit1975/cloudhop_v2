import { useState, useEffect } from 'react'
import { SpaceSoundtrack, SoundtrackType, defaultSoundtracks } from './SpaceSoundtrack'
import { useMusicState } from '../../music/MusicState'

export function useSpaceSoundtrack(spaceId: string, userRole: 'host' | 'guest' = 'host') {
  const [soundtrack, setSoundtrack] = useState<SpaceSoundtrack | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const setCurrentTrack = useMusicState((state) => state.setCurrentTrack)

  const loadSoundtrack = async (type: SoundtrackType) => {
    setIsLoading(true)
    try {
      // In production, this would load from a backend
      const template = defaultSoundtracks[type]
      const newSoundtrack: SpaceSoundtrack = {
        id: `${spaceId}-${type}`,
        spaceId,
        type,
        tracks: [],
        isActive: false,
        shuffleEnabled: template.shuffleEnabled ?? false,
        repeatEnabled: template.repeatEnabled ?? false
      }
      setSoundtrack(newSoundtrack)
    } finally {
      setIsLoading(false)
    }
  }

  const activateSoundtrack = () => {
    if (soundtrack && userRole === 'host') {
      setSoundtrack({ ...soundtrack, isActive: true })
      if (soundtrack.tracks.length > 0) {
        setCurrentTrack(soundtrack.tracks[0])
      }
    }
  }

  const deactivateSoundtrack = () => {
    if (soundtrack && userRole === 'host') {
      setSoundtrack({ ...soundtrack, isActive: false })
    }
  }

  return {
    soundtrack,
    isLoading,
    loadSoundtrack,
    activateSoundtrack,
    deactivateSoundtrack
  }
}
