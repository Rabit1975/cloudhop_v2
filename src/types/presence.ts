// Presence type definitions
export interface Presence {
  userId: string
  spaceId: string
  status: PresenceStatus
  lastSeen: string
  metadata?: PresenceMetadata
}

export type PresenceStatus = 'online' | 'away' | 'busy' | 'offline'

export interface PresenceMetadata {
  device: string
  activity?: string
  customStatus?: string
}

export interface OnlineUser {
  userId: string
  name: string
  avatar?: string
  status: PresenceStatus
  joinedAt: string
}
