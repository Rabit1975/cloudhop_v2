// Space type definitions
export interface Space {
  id: string
  name: string
  description?: string
  type: SpaceType
  ownerId: string
  members: string[]
  createdAt: string
  updatedAt: string
  settings: SpaceSettings
}

export type SpaceType = 'public' | 'private' | 'gaming' | 'work' | 'community'

export interface SpaceSettings {
  isPublic: boolean
  allowGuests: boolean
  maxMembers: number
  features: SpaceFeatures
}

export interface SpaceFeatures {
  chat: boolean
  voice: boolean
  video: boolean
  screen_sharing: boolean
  ai_tools: boolean
}

export interface SpaceMember {
  userId: string
  spaceId: string
  role: 'owner' | 'admin' | 'member'
  joinedAt: string
}
