import { useMusicState } from '../MusicState'

export interface MusicDiagnosticInfo {
  currentTrack: any
  status: string
  volume: number
  currentTime: number
  duration: number
  error: string | null
  isLoading: boolean
}

export function getMusicDiagnostics(): MusicDiagnosticInfo {
  const state = useMusicState.getState()
  
  return {
    currentTrack: state.currentTrack,
    status: state.status,
    volume: state.volume,
    currentTime: state.currentTime,
    duration: state.duration,
    error: state.error,
    isLoading: state.isLoading
  }
}

export function formatMusicDiagnostics(info: MusicDiagnosticInfo): string {
  return `
Music Engine Diagnostics:
- Status: ${info.status}
- Current Track: ${info.currentTrack ? `${info.currentTrack.title} by ${info.currentTrack.artist}` : 'None'}
- Volume: ${Math.round(info.volume * 100)}%
- Time: ${info.currentTime.toFixed(1)}s / ${info.duration.toFixed(1)}s
- Error: ${info.error || 'None'}
- Loading: ${info.isLoading}
  `.trim()
}
