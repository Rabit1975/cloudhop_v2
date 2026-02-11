import { DJQueueItem } from './DJQueueItem'
import { MusicTrack } from '../MusicState'

export class QueueOperations {
  static createQueueItem(track: MusicTrack, addedBy: string): DJQueueItem {
    return {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      track,
      addedBy,
      addedAt: Date.now(),
      votes: 0,
      votedBy: []
    }
  }

  static addToQueue(queue: DJQueueItem[], track: MusicTrack, addedBy: string): DJQueueItem[] {
    const item = this.createQueueItem(track, addedBy)
    return [...queue, item]
  }

  static removeFromQueue(queue: DJQueueItem[], id: string): DJQueueItem[] {
    return queue.filter((item) => item.id !== id)
  }

  static getNextItem(queue: DJQueueItem[]): { nextItem: DJQueueItem | null; remainingQueue: DJQueueItem[] } {
    if (queue.length === 0) {
      return { nextItem: null, remainingQueue: [] }
    }
    
    const nextItem = queue[0]
    const remainingQueue = queue.slice(1)
    
    return { nextItem, remainingQueue }
  }

  static addToHistory(history: DJQueueItem[], item: DJQueueItem): DJQueueItem[] {
    return [item, ...history]
  }

  static voteForItem(queue: DJQueueItem[], id: string, userId: string): DJQueueItem[] {
    return queue.map((item) =>
      item.id === id && !item.votedBy.includes(userId)
        ? {
            ...item,
            votes: item.votes + 1,
            votedBy: [...item.votedBy, userId]
          }
        : item
    )
  }

  static unvoteForItem(queue: DJQueueItem[], id: string, userId: string): DJQueueItem[] {
    return queue.map((item) =>
      item.id === id && item.votedBy.includes(userId)
        ? {
            ...item,
            votes: item.votes - 1,
            votedBy: item.votedBy.filter((uid) => uid !== userId)
          }
        : item
    )
  }

  static reorderQueue(queue: DJQueueItem[], fromIndex: number, toIndex: number): DJQueueItem[] {
    const newQueue = [...queue]
    const [removed] = newQueue.splice(fromIndex, 1)
    newQueue.splice(toIndex, 0, removed)
    return newQueue
  }

  static clearQueue(): DJQueueItem[] {
    return []
  }
}
