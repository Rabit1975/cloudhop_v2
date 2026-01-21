import { useEffect, useState } from 'react'
import { useRealtimeContext } from '@kernel/providers/RealtimeProvider'

export function useRealtime(channel: string) {
  const { isConnected, subscribe, unsubscribe } = useRealtimeContext()
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    subscribe(channel)
    return () => {
      unsubscribe(channel)
    }
  }, [channel])

  const sendMessage = (message: any) => {
    // Send message to channel
    console.log('Send to channel:', channel, message)
  }

  return {
    isConnected,
    messages,
    sendMessage
  }
}
