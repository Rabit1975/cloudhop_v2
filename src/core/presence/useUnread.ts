import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useUnread(channelId?: string) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!channelId) return

    const fetchUnread = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data } = await supabase
          .from('unread')
          .select('count')
          .eq('user_id', user.id)
          .eq('channel_id', channelId)
          .single()

        setUnreadCount(data?.count || 0)
      }
    }

    fetchUnread()

    // Listen for new messages
    const channel = supabase
      .channel(`unread:${channelId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        () => {
          fetchUnread()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [channelId])

  const markAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user && channelId) {
      await supabase.from('unread').upsert({
        user_id: user.id,
        channel_id: channelId,
        count: 0,
        last_read: new Date().toISOString()
      })
      setUnreadCount(0)
    }
  }

  return { unreadCount, markAsRead }
}

export function useGroupUnread(groupId: string) {
  const [totalUnread, setTotalUnread] = useState(0)

  useEffect(() => {
    if (!groupId) return

    const fetchGroupUnread = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Get all channels in this group
        const { data: channels } = await supabase
          .from('hub_channels')
          .select('id')
          .eq('group_id', groupId)

        if (channels) {
          const channelIds = channels.map(c => c.id)
          
          const { data: unreads } = await supabase
            .from('unread')
            .select('count')
            .eq('user_id', user.id)
            .in('channel_id', channelIds)

          const total = unreads?.reduce((sum, u) => sum + (u.count || 0), 0) || 0
          setTotalUnread(total)
        }
      }
    }

    fetchGroupUnread()

    const interval = setInterval(fetchGroupUnread, 10000)

    return () => clearInterval(interval)
  }, [groupId])

  return totalUnread
}
