import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export function useMeeting(channelId: string | undefined) {
  const [inCall, setInCall] = useState(false)
  const [callActive, setCallActive] = useState(false)
  const [participants, setParticipants] = useState(0)

  // Listen for call state changes
  useEffect(() => {
    if (!channelId) return

    const channel = supabase
      .channel(`meeting:${channelId}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'meetings', 
          filter: `channel_id=eq.${channelId}` 
        },
        (payload) => {
          if (payload.new?.active !== undefined) {
            setCallActive(payload.new.active)
          }
          if (payload.new?.participants !== undefined) {
            setParticipants(payload.new.participants)
          }
        }
      )
      .subscribe()

    // Check initial state
    checkCallState()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [channelId])

  async function checkCallState() {
    if (!channelId) return

    const { data } = await supabase
      .from('meetings')
      .select('active, participants')
      .eq('channel_id', channelId)
      .single()

    if (data) {
      setCallActive(data.active || false)
      setParticipants(data.participants || 0)
    }
  }

  async function startCall() {
    if (!channelId) return

    await supabase.from('meetings').upsert({
      channel_id: channelId,
      active: true,
      participants: 1
    })
    setInCall(true)
  }

  async function joinCall() {
    if (!channelId) return

    // Increment participant count
    const { data } = await supabase
      .from('meetings')
      .select('participants')
      .eq('channel_id', channelId)
      .single()

    await supabase
      .from('meetings')
      .update({ participants: (data?.participants || 0) + 1 })
      .eq('channel_id', channelId)

    setInCall(true)
  }

  async function leaveCall() {
    if (!channelId) return

    // Decrement participant count
    const { data } = await supabase
      .from('meetings')
      .select('participants')
      .eq('channel_id', channelId)
      .single()

    const newCount = Math.max(0, (data?.participants || 1) - 1)

    if (newCount === 0) {
      // Last person leaving, deactivate call
      await supabase
        .from('meetings')
        .update({ active: false, participants: 0 })
        .eq('channel_id', channelId)
    } else {
      await supabase
        .from('meetings')
        .update({ participants: newCount })
        .eq('channel_id', channelId)
    }

    setInCall(false)
  }

  return {
    inCall,
    callActive,
    participants,
    startCall,
    joinCall,
    leaveCall
  }
}
