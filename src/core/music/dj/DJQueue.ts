import { create } from 'zustand'
import { DJQueueItem } from './DJQueueItem'
import { MusicTrack } from '../MusicState'

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

export const useDJQueue = create<DJQueueState>((set, get) => ({
  queue: [],
  history: [],
  
  add: (track, addedBy) => {
    const item: DJQueueItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      track,
      addedBy,
      addedAt: Date.now(),
      votes: 0,
      votedBy: []
    }
    set((state) => ({ queue: [...state.queue, item] }))
  },
  
  remove: (id) => {
    set((state) => ({ queue: state.queue.filter((item) => item.id !== id) }))
  },
  
  next: () => {
    const { queue } = get()
    if (queue.length === 0) return null
    
    const nextItem = queue[0]
    set((state) => ({
      queue: state.queue.slice(1),
      history: [nextItem, ...state.history]
    }))
    
    return nextItem
  },
  
  clear: () => {
    set({ queue: [] })
  },
  
  vote: (id, userId) => {
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id && !item.votedBy.includes(userId)
          ? {
              ...item,
              votes: item.votes + 1,
              votedBy: [...item.votedBy, userId]
            }
          : item
      )
    }))
  },
  
  unvote: (id, userId) => {
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id && item.votedBy.includes(userId)
          ? {
              ...item,
              votes: item.votes - 1,
              votedBy: item.votedBy.filter((uid) => uid !== userId)
            }
          : item
      )
    }))
  },
  
  reorder: (fromIndex, toIndex) => {
    set((state) => {
      const newQueue = [...state.queue]
      const [removed] = newQueue.splice(fromIndex, 1)
      newQueue.splice(toIndex, 0, removed)
      return { queue: newQueue }
    })
  }
}))
