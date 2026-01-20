// User type definitions
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  bio?: string
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export type UserStatus = 'online' | 'away' | 'busy' | 'offline'

export interface UserProfile extends User {
  settings: UserSettings
  preferences: UserPreferences
}

export interface UserSettings {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
}

export interface UserPreferences {
  defaultView: string
  soundEnabled: boolean
  autoJoinMeetings: boolean
}
