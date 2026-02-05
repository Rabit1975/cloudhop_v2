import { MusicTrack } from '../MusicState'

export interface DJQueueItem {
  id: string
  track: MusicTrack
  addedBy: string
  addedAt: number
  votes: number
  votedBy: string[]
}
