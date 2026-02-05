import React, { useState } from 'react'
import HubSidebar from './HubSidebar'
import HubTopBar from './HubTopBar'
import HubRouter from './HubRouter'
import { useHubData } from './useHubData'

export default function HopHubModule() {
  const { groups, channels, activeChannel, selectChannel } = useHubData()

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#1a1a2e' }}>
      <HubSidebar
        groups={groups}
        channels={channels}
        activeChannel={activeChannel}
        onSelect={selectChannel}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <HubTopBar channel={activeChannel} />
        <HubRouter channel={activeChannel} />
      </div>
    </div>
  )
}
