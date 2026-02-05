import { useDJQueue } from './DJQueue'
import { DJEventBus } from './DJEvents'
import { MusicTrack } from '../MusicState'

export class DJGuestController {
  private queue = useDJQueue.getState()

  addTrack(track: MusicTrack, userId: string): void {
    this.queue.add(track, userId)
    DJEventBus.emit('queue:add', { track, userId })
  }

  vote(itemId: string, userId: string): void {
    this.queue.vote(itemId, userId)
  }

  unvote(itemId: string, userId: string): void {
    this.queue.unvote(itemId, userId)
  }
}
