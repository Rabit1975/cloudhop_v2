export interface MusicSettings {
  volume: number // 0-1 normalized
  crossfadeDuration: number // milliseconds
  autoPlay: boolean
  syncEnabled: boolean
  preferredTransport: 'audio' | 'youtube'
  preloadNext: boolean
}

export const defaultMusicSettings: MusicSettings = {
  volume: 0.5,
  crossfadeDuration: 3000,
  autoPlay: false,
  syncEnabled: true,
  preferredTransport: 'audio',
  preloadNext: true
}
