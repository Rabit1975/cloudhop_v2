import { useCallback, useEffect, useRef } from 'react'
import { useMusicState, MusicTrack, selectCurrentTrack, selectStatus, selectVolume, selectCurrentTime, selectDuration, selectError } from './MusicState'
import { useMusicEngineContext } from './MusicEngineProvider'
import { canControlPlayback } from './MusicPermissions'
import { UserRole } from './shared/UserRole'

export interface UseMusicEngineOptions {
  role?: UserRole
  autoPlay?: boolean
  onTrackEnd?: () => void
}

export function useMusicEngine(options: UseMusicEngineOptions = {}) {
  const { role = 'viewer', autoPlay = false, onTrackEnd } = options
  
  // Select state slices with selectors
  const currentTrack = useMusicState(selectCurrentTrack)
  const status = useMusicState(selectStatus)
  const volume = useMusicState(selectVolume)
  const currentTime = useMusicState(selectCurrentTime)
  const duration = useMusicState(selectDuration)
  const error = useMusicState(selectError)
  
  // Get actions from store
  const setCurrentTrack = useMusicState((state) => state.setCurrentTrack)
  const setStatus = useMusicState((state) => state.setStatus)
  const setVolume = useMusicState((state) => state.setVolume)
  const setCurrentTime = useMusicState((state) => state.setCurrentTime)
  const setDuration = useMusicState((state) => state.setDuration)
  const setError = useMusicState((state) => state.setError)
  const setLoading = useMusicState((state) => state.setLoading)
  
  // Get transport from context
  const { transportRef, settings } = useMusicEngineContext()
  const timeUpdateIntervalRef = useRef<any>(null)

  // Helper to start time update interval
  const startTimeUpdates = useCallback(() => {
    // Clear existing interval if any
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current)
    }
    
    // Start time updates
    const interval = setInterval(async () => {
      if (transportRef.current) {
        const time = await transportRef.current.getCurrentTime()
        setCurrentTime(time)
        
        // Check if track ended
        const dur = await transportRef.current.getDuration()
        if (time >= dur && onTrackEnd) {
          clearInterval(interval)
          timeUpdateIntervalRef.current = null
          onTrackEnd()
        }
      }
    }, 1000)
    
    timeUpdateIntervalRef.current = interval
  }, [transportRef, setCurrentTime, onTrackEnd])

  // Load track
  const loadTrack = useCallback(async (track: MusicTrack) => {
    if (!transportRef.current) {
      setError('Transport not initialized')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const url = track.url || track.id
      await transportRef.current.load(url)
      
      setCurrentTrack(track)
      const trackDuration = await transportRef.current.getDuration()
      setDuration(trackDuration)
      setStatus('stopped')
      
      if (autoPlay && canControlPlayback(role)) {
        await transportRef.current.play()
        setStatus('playing')
        startTimeUpdates()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load track')
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }, [transportRef, setCurrentTrack, setDuration, setStatus, setError, setLoading, autoPlay, role, startTimeUpdates])

  // Play
  const play = useCallback(async () => {
    if (!canControlPlayback(role)) {
      setError('No permission to control playback')
      return
    }

    if (!transportRef.current) {
      setError('Transport not initialized')
      return
    }

    try {
      await transportRef.current.play()
      setStatus('playing')
      setError(null)
      startTimeUpdates()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play')
      setStatus('error')
    }
  }, [role, transportRef, setStatus, setError, startTimeUpdates])

  // Pause
  const pause = useCallback(async () => {
    if (!canControlPlayback(role)) {
      setError('No permission to control playback')
      return
    }

    if (!transportRef.current) {
      setError('Transport not initialized')
      return
    }

    try {
      await transportRef.current.pause()
      setStatus('paused')
      
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current)
        timeUpdateIntervalRef.current = null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to pause')
    }
  }, [role, transportRef, setStatus, setError])

  // Stop
  const stop = useCallback(async () => {
    if (!canControlPlayback(role)) {
      setError('No permission to control playback')
      return
    }

    if (!transportRef.current) {
      setError('Transport not initialized')
      return
    }

    try {
      await transportRef.current.stop()
      setStatus('stopped')
      setCurrentTime(0)
      
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current)
        timeUpdateIntervalRef.current = null
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop')
    }
  }, [role, transportRef, setStatus, setCurrentTime, setError])

  // Seek
  const seek = useCallback(async (seconds: number) => {
    if (!canControlPlayback(role)) {
      setError('No permission to control playback')
      return
    }

    if (!transportRef.current) {
      setError('Transport not initialized')
      return
    }

    try {
      await transportRef.current.seek(seconds)
      setCurrentTime(seconds)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to seek')
    }
  }, [role, transportRef, setCurrentTime, setError])

  // Set volume
  const changeVolume = useCallback(async (vol: number) => {
    if (!transportRef.current) {
      return
    }

    try {
      await transportRef.current.setVolume(vol)
      setVolume(vol)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set volume')
    }
  }, [transportRef, setVolume, setError])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current)
      }
    }
  }, [])

  return {
    currentTrack,
    status,
    isPlaying: status === 'playing',
    volume,
    currentTime,
    duration,
    error,
    loadTrack,
    play,
    pause,
    stop,
    seek,
    setVolume: changeVolume
  }
}
