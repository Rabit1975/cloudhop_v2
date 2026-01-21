import { create } from 'zustand'

export interface MusicTrack {
  id: string
  title: string
  artist: string
  duration: number // seconds
  thumbnail?: string
  url?: string
  source?: 'audio' | 'youtube' | 'spotify'
}

export type MusicStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'stopped' | 'error'

export interface MusicEngineState {
  currentTrack: MusicTrack | null
  status: MusicStatus
  volume: number // 0-1 normalized
  currentTime: number // seconds
  duration: number // seconds
  error: string | null
  isLoading: boolean
  
  // Actions
  setCurrentTrack: (track: MusicTrack | null) => void
  setStatus: (status: MusicStatus) => void
  setVolume: (volume: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

const initialState = {
  currentTrack: null,
  status: 'idle' as MusicStatus,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  error: null,
  isLoading: false
}

export const useMusicState = create<MusicEngineState>((set) => ({
  ...initialState,
  
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setStatus: (status) => set({ status }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),
  reset: () => set(initialState)
}))

// Selectors for safe reads
export const selectCurrentTrack = (state: MusicEngineState) => state.currentTrack
export const selectStatus = (state: MusicEngineState) => state.status
export const selectVolume = (state: MusicEngineState) => state.volume
export const selectCurrentTime = (state: MusicEngineState) => state.currentTime
export const selectDuration = (state: MusicEngineState) => state.duration
export const selectError = (state: MusicEngineState) => state.error
export const selectIsLoading = (state: MusicEngineState) => state.isLoading
export const selectIsPlaying = (state: MusicEngineState) => state.status === 'playing'
