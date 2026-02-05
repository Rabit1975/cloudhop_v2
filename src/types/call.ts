// Call type definitions
export interface Call {
  id: string
  roomId: string
  type: CallType
  participants: CallParticipant[]
  startedAt: string
  endedAt?: string
  status: CallStatus
  settings: CallSettings
}

export type CallType = 'audio' | 'video' | 'screen-share'

export type CallStatus = 'waiting' | 'active' | 'ended'

export interface CallParticipant {
  userId: string
  joinedAt: string
  leftAt?: string
  isMuted: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
}

export interface CallSettings {
  recordingEnabled: boolean
  backgroundBlurEnabled: boolean
  noiseCancellationEnabled: boolean
  maxParticipants: number
}

export interface MediaStream {
  id: string
  userId: string
  type: 'audio' | 'video' | 'screen'
  stream: MediaStream
}
