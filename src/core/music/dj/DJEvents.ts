import { DJQueueItem } from './DJQueueItem'
import { MusicTrack } from '../MusicState'

export type DJEventType = 'queue:add' | 'queue:remove' | 'queue:clear' | 'queue:next' | 'queue:reorder'

export interface DJEvent {
  type: DJEventType
  data: any
  timestamp: number
}

type DJEventListener = (event: DJEvent) => void

class DJEventBusClass {
  private listeners: Map<DJEventType, Set<DJEventListener>> = new Map()

  subscribe(type: DJEventType, listener: DJEventListener): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    
    this.listeners.get(type)!.add(listener)
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(type)
      if (listeners) {
        listeners.delete(listener)
      }
    }
  }

  emit(type: DJEventType, data: any): void {
    const event: DJEvent = {
      type,
      data,
      timestamp: Date.now()
    }
    
    const listeners = this.listeners.get(type)
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(event)
        } catch (error) {
          console.error('Error in DJ event listener:', error)
        }
      })
    }
  }

  unsubscribeAll(type?: DJEventType): void {
    if (type) {
      this.listeners.delete(type)
    } else {
      this.listeners.clear()
    }
  }
}

export const DJEventBus = new DJEventBusClass()
