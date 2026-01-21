import { useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export type PresenceStatus = 'online' | 'idle' | 'in_call' | 'in_space' | 'offline'

export function usePresence(status: PresenceStatus) {
  useEffect(() => {
    if (!status) return

    const updatePresence = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await supabase.from('presence').upsert({
          user_id: user.id,
          status,
          updated_at: new Date().toISOString()
        })
      }
    }

    updatePresence()

    // Update presence every 30 seconds to keep it fresh
    const interval = setInterval(updatePresence, 30000)

    // Cleanup on unmount or status change
    return () => {
      clearInterval(interval)
    }
  }, [status])
}
