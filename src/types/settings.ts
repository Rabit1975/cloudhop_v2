// Settings type definitions
export interface AppSettings {
  theme: Theme
  notifications: NotificationSettings
  audio: AudioSettings
  video: VideoSettings
  privacy: PrivacySettings
  language: string
}

export interface Theme {
  mode: 'light' | 'dark' | 'auto'
  accentColor: string
  fontSize: 'small' | 'medium' | 'large'
}

export interface NotificationSettings {
  enabled: boolean
  sound: boolean
  desktop: boolean
  mentions: boolean
  directMessages: boolean
}

export interface AudioSettings {
  inputDeviceId: string
  outputDeviceId: string
  volume: number
  echoCancellation: boolean
  noiseSuppression: boolean
}

export interface VideoSettings {
  deviceId: string
  resolution: '720p' | '1080p' | '4k'
  frameRate: 30 | 60
  backgroundBlur: boolean
}

export interface PrivacySettings {
  onlineStatus: boolean
  readReceipts: boolean
  typingIndicator: boolean
  lastSeen: boolean
}
