import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export interface Group {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Channel {
  id: string
  group_id: string
  name: string
  type: 'chat' | 'meeting' | 'space'
  description?: string
  space_id?: string
  created_at: string
}

export function useHubData() {
  const [groups, setGroups] = useState<Group[]>([])
  const [channels, setChannels] = useState<Channel[]>([])
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

  // Load groups and channels from Supabase
  useEffect(() => {
    loadGroups()
    loadChannels()
  }, [])

  async function loadGroups() {
    const { data, error } = await supabase
      .from('hub_groups')
      .select('*')
      .order('created_at', { ascending: true })

    if (!error && data) {
      setGroups(data)
    }
  }

  async function loadChannels() {
    const { data, error } = await supabase
      .from('hub_channels')
      .select('*')
      .order('created_at', { ascending: true })

    if (!error && data) {
      setChannels(data)
    }
  }

  async function createGroup(name: string, description?: string) {
    const { data, error} = await supabase
      .from('hub_groups')
      .insert({ name, description })
      .select()
      .single()

    if (!error && data) {
      setGroups(prev => [...prev, data])
      return data
    }
    return null
  }

  async function createChannel(
    groupId: string,
    name: string,
    type: 'chat' | 'meeting' | 'space',
    description?: string,
    spaceId?: string
  ) {
    const { data, error } = await supabase
      .from('hub_channels')
      .insert({
        group_id: groupId,
        name,
        type,
        description,
        space_id: spaceId
      })
      .select()
      .single()

    if (!error && data) {
      setChannels(prev => [...prev, data])
      return data
    }
    return null
  }

  function selectChannel(channel: Channel) {
    setActiveChannel(channel)
  }

  return {
    groups,
    channels,
    activeChannel,
    createGroup,
    createChannel,
    selectChannel,
    loadGroups,
    loadChannels
  }
}
