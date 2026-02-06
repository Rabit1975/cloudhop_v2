import React, { useState } from 'react'

type HopHubSubNav = 'hophub' | 'music' | 'gamehub' | 'spaces'

interface Group {
  id: string
  name: string
  description: string
  members: number
  createdAt: Date
}

interface Channel {
  id: string
  name: string
  description: string
  type: 'text' | 'voice' | 'announcement'
  members: number
  createdAt: Date
}

interface HopHubLayoutProps {
  currentSubLevel: string
  setCurrentSubLevel: (subLevel: string) => void
}

const HopHubLayout: React.FC<HopHubLayoutProps> = ({ currentSubLevel, setCurrentSubLevel }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [selectedChannel, setSelectedChannel] = useState<string>('')
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupDesc, setNewGroupDesc] = useState('')
  const [newChannelName, setNewChannelName] = useState('')
  const [newChannelDesc, setNewChannelDesc] = useState('')
  const [newChannelType, setNewChannelType] = useState<'text' | 'voice' | 'announcement'>('text')
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Gaming Crew', description: 'For gamers and gaming enthusiasts', members: 24, createdAt: new Date() },
    { id: '2', name: 'Music Lovers', description: 'Share and discuss music', members: 42, createdAt: new Date() }
  ])
  const [channels, setChannels] = useState<Channel[]>([
    { id: '1', name: 'announcements', description: 'Official announcements', type: 'announcement', members: 150, createdAt: new Date() },
    { id: '2', name: 'general', description: 'General discussion', type: 'text', members: 89, createdAt: new Date() }
  ])

  // Create new group
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return
    
    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      description: newGroupDesc || 'New group chat',
      members: 1,
      createdAt: new Date()
    }
    
    setGroups(prev => [...prev, newGroup])
    setSelectedGroup(newGroup.id)
    setNewGroupName('')
    setNewGroupDesc('')
    setShowCreateGroup(false)
  }

  // Create new channel
  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return
    
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: newChannelName,
      description: newChannelDesc || 'New channel',
      type: newChannelType,
      members: 1,
      createdAt: new Date()
    }
    
    setChannels(prev => [...prev, newChannel])
    setSelectedChannel(newChannel.id)
    setNewChannelName('')
    setNewChannelDesc('')
    setShowCreateChannel(false)
  }

  // HopHub sub-navigation items
  const subNavItems = [
    { id: 'hophub', label: 'HopHub', icon: '💬', color: 'from-purple-600 to-blue-600' },
    { id: 'music', label: 'Music', icon: '🎵', color: 'from-green-600 to-emerald-600' },
    { id: 'gamehub', label: 'GameHub', icon: '🎮', color: 'from-orange-600 to-red-600' },
    { id: 'spaces', label: 'Spaces', icon: '✨', color: 'from-indigo-600 to-purple-600' }
  ]

  return (
    <div className="h-full">
      {/* HopHub Sub-Navigation Bar */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {subNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentSubLevel(item.id)
                setSelectedGroup('')
                setSelectedChannel('')
              }}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
                currentSubLevel === item.id
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                  : 'bg-gray-800/50 hover:bg-gray-700/50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Content - Simplified for now */}
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4">💬</span>
          <h2 className="text-2xl font-bold mb-2">Welcome to HopHub</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Enhanced HopHub with Groups & Channels coming soon!
          </p>
        </div>
      </div>
    </div>
  )
}

export default HopHubLayout
