import React from 'react'
import ChatModule from '../chat/ChatModule'
import MeetingChannel from './meetings/MeetingChannel'
import SpacesModule from '../spaces/SpacesModule'

export default function HubRouter({ channel }) {
  if (!channel) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        fontSize: '18px'
      }}>
        👈 Select a channel from the sidebar
      </div>
    )
  }

  switch (channel.type) {
    case 'chat':
      return <ChatModule channelId={channel.id} />
    case 'meeting':
      return <MeetingChannel channelId={channel.id} />
    case 'space':
      return <SpacesModule spaceId={channel.space_id} />
    default:
      return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Unknown channel type: {channel.type}
        </div>
      )
  }
}
