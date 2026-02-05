// Realtime channel definitions
export const channels = {
  chat: (roomId: string) => `chat:${roomId}`,
  presence: (spaceId: string) => `presence:${spaceId}`,
  meeting: (meetingId: string) => `meeting:${meetingId}`,
  notifications: (userId: string) => `notifications:${userId}`
} as const

export type ChannelType = keyof typeof channels
