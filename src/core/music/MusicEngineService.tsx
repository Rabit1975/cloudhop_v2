import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  thumbnail?: string
}

interface AudioFeatures {
  bass: number
  mid: number
  high: number
  energy: number
  bpm: number
}

interface EmotionalState {
  valence: number
  arousal: number
  dominance: number
}

interface MusicEngineState {
  currentTrack: Track | null
  isPlaying: boolean
  audioFeatures: AudioFeatures | null
  emotionalState: EmotionalState | null
  volume: number
}

interface MusicEngineContextValue extends MusicEngineState {
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  loadTrack: (track: Track) => void
  next: () => void
  previous: () => void
}

const MusicEngineContext = createContext<MusicEngineContextValue | null>(null)

export const useMusicEngine = () => {
  const context = useContext(MusicEngineContext)
  if (!context) {
    throw new Error('useMusicEngine must be used within MusicEngineProvider')
  }
  return context
}

interface MusicEngineProviderProps {
  children: ReactNode
}

export const MusicEngineProvider: React.FC<MusicEngineProviderProps> = ({ children }) => {
  const [state, setState] = useState<MusicEngineState>({
    currentTrack: null,
    isPlaying: false,
    audioFeatures: null,
    emotionalState: null,
    volume: 0.8
  })

  // Simulate audio feature updates when playing
  useEffect(() => {
    if (!state.isPlaying) return

    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        audioFeatures: {
          bass: Math.random() * 0.5 + 0.3,
          mid: Math.random() * 0.4 + 0.4,
          high: Math.random() * 0.3 + 0.2,
          energy: Math.random() * 0.4 + 0.5,
          bpm: 120 + Math.random() * 20
        },
        emotionalState: {
          valence: Math.random() * 0.4 + 0.5,
          arousal: Math.random() * 0.3 + 0.6,
          dominance: Math.random() * 0.3 + 0.5
        }
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [state.isPlaying])

  const play = () => {
    setState(prev => ({ ...prev, isPlaying: true }))
  }

  const pause = () => {
    setState(prev => ({ ...prev, isPlaying: false }))
  }

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }))
  }

  const loadTrack = (track: Track) => {
    setState(prev => ({ ...prev, currentTrack: track, isPlaying: true }))
  }

  const next = () => {
    // Placeholder for next track logic
    console.log('Next track')
  }

  const previous = () => {
    // Placeholder for previous track logic
    console.log('Previous track')
  }

  const value: MusicEngineContextValue = {
    ...state,
    play,
    pause,
    setVolume,
    loadTrack,
    next,
    previous
  }

  return (
    <MusicEngineContext.Provider value={value}>
      {children}
    </MusicEngineContext.Provider>
  )
}
