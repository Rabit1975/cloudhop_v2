// Message type definitions
export interface Message {
  id: string
  content: string
  senderId: string
  channelId: string
  type: MessageType
  attachments?: Attachment[]
  reactions?: Reaction[]
  replyTo?: string
  createdAt: string
  updatedAt: string
  isEdited: boolean
  isDeleted: boolean
}

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file' | 'system'

export interface Attachment {
  id: string
  type: 'image' | 'video' | 'audio' | 'file'
  url: string
  name: string
  size: number
  mimeType: string
}

export interface Reaction {
  emoji: string
  userId: string
  timestamp: string
}

export interface Channel {
  id: string
  name: string
  spaceId: string
  type: 'text' | 'voice' | 'video'
  members: string[]
  createdAt: string
}
