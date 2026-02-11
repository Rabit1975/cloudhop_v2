import create from 'zustand'
import { DJQueueItem } from './DJQueueItem'
import { MusicTrack } from '../MusicState'
import { QueueOperations } from './QueueOperations'

export interface DJQueueState {
  queue: DJQueueItem[]
  history: DJQueueItem[]
  
  // Actions
  add: (track: MusicTrack, addedBy: string) => void
  remove: (id: string) => void
  next: () => DJQueueItem | null
  clear: () => void
  vote: (id: string, userId: string) => void
  unvote: (id: string, userId: string) => void
  reorder: (fromIndex: number, toIndex: number) => void
}

export const useDJQueue = create<DJQueueState>((set: any, get: any) => ({
  queue: [],
  history: [],
  
  add: (track: MusicTrack, addedBy: string) => {
    set((state: any) => ({ 
      queue: QueueOperations.addToQueue(state.queue, track, addedBy) 
    }))
  },
  
  remove: (id: string) => {
    set((state: any) => ({ 
      queue: QueueOperations.removeFromQueue(state.queue, id) 
    }))
  },
  
  next: () => {
    const { queue } = get()
    const { nextItem, remainingQueue } = QueueOperations.getNextItem(queue)
    
    if (nextItem) {
      set((state: any) => ({
        queue: remainingQueue,
        history: QueueOperations.addToHistory(state.history, nextItem)
      }))
    }
    
    return nextItem
  },
  
  clear: () => {
    set({ queue: QueueOperations.clearQueue() })
  },
  
  vote: (id: string, userId: string) => {
    set((state: any) => ({
      queue: QueueOperations.voteForItem(state.queue, id, userId)
    }))
  },
  
  unvote: (id: string, userId: string) => {
    set((state: any) => ({
      queue: QueueOperations.unvoteForItem(state.queue, id, userId)
    }))
  },
  
  reorder: (fromIndex: number, toIndex: number) => {
    set((state: any) => ({ 
      queue: QueueOperations.reorderQueue(state.queue, fromIndex, toIndex) 
    }))
  }
}))
