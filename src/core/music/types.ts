export interface Track {
  id: string
  title: string
  artist: string
  duration: number
  thumbnail: string
}

export interface Playlist {
  id: string
  title: string
  description?: string
  tracks?: Track[]
  thumbnail?: string
}

export type PlaybackState = 'playing' | 'paused' | 'stopped' | 'seeking'

export interface MusicEngineConfig {
  channelId: string
  autoPlay?: boolean
  volume?: number
  syncEnabled?: boolean
}

export interface MusicSessionState {
  channel_id: string
  current_track?: string
  track_title?: string
  track_artist?: string
  track_duration?: number
  track_thumbnail?: string
  playlist_id?: string
  current_time?: number
  is_playing: boolean
  host_id?: string
  updated_at: string
}

export interface QueueItem {
  id: string
  channel_id: string
  track_id: string
  track_title: string
  track_artist: string
  added_by: string
  votes: number
  position: number
  created_at: string
}
