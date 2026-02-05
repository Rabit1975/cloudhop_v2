import { useDJQueue } from './DJQueue'
import { DJEventBus } from './DJEvents'
import { MusicTrack } from '../MusicState'

export class DJHostController {
  private queue = useDJQueue.getState()

  addTrack(track: MusicTrack, userId: string): void {
    this.queue.add(track, userId)
    DJEventBus.emit('queue:add', { track, userId })
  }

  removeTrack(itemId: string): void {
    this.queue.remove(itemId)
    DJEventBus.emit('queue:remove', { itemId })
  }

  clearQueue(): void {
    this.queue.clear()
    DJEventBus.emit('queue:clear', {})
  }

  nextTrack(): MusicTrack | null {
    const item = this.queue.next()
    if (item) {
      DJEventBus.emit('queue:next', { item })
      return item.track
    }
    return null
  }

  reorderQueue(fromIndex: number, toIndex: number): void {
    this.queue.reorder(fromIndex, toIndex)
    DJEventBus.emit('queue:reorder', { fromIndex, toIndex })
  }
}
