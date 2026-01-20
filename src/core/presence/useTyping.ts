import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useTyping(channelId: string) {
  const [typingUsers, setTypingUsers] = useState<string[]>([])

  // Send typing indicator
  const sendTyping = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user && channelId) {
      await supabase.from('typing').upsert({
        channel_id: channelId,
        user_id: user.id,
        updated_at: new Date().toISOString()
      })
    }
  }, [channelId])

  // Listen for typing events
  useEffect(() => {
    if (!channelId) return

    const channel = supabase
      .channel(`typing:${channelId}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'typing',
          filter: `channel_id=eq.${channelId}`
        },
        (payload: any) => {
          const userId = payload.new.user_id
          setTypingUsers((users) => {
            if (!users.includes(userId)) {
              return [...users, userId]
            }
            return users
          })

          // Remove user from typing after 3 seconds
          setTimeout(() => {
            setTypingUsers((users) => users.filter(id => id !== userId))
          }, 3000)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [channelId])

  return { typingUsers, sendTyping }
}
