import React from 'react'
import { NowPlayingWidget } from './NowPlayingWidget'
import { TransportControls } from './TransportControls'
import { VolumeControl } from './VolumeControl'
import { UserRole } from '../../core/music/shared/UserRole'

export interface MusicEnginePanelProps {
  role?: UserRole
}

export function MusicEnginePanel({ role = 'viewer' }: MusicEnginePanelProps) {
  return (
    <div style={{
      background: 'var(--bg-primary, #16213e)',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      minWidth: '320px'
    }}>
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'var(--text-primary, #fff)',
        borderBottom: '2px solid var(--accent-color, #e94560)',
        paddingBottom: '8px'
      }}>
        Music Engine
      </div>
      <NowPlayingWidget />
      <TransportControls role={role} />
      <VolumeControl />
    </div>
  )
}
