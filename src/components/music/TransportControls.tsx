import React from 'react'
import { useMusicEngine } from '../../core/music/useMusicEngine'
import { UserRole } from '../../core/music/shared/UserRole'

export interface TransportControlsProps {
  role?: UserRole
}

export function TransportControls({ role = 'viewer' }: TransportControlsProps) {
  const { isPlaying, play, pause, stop } = useMusicEngine({ role })

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
      <button
        onClick={play}
        disabled={isPlaying}
        style={{
          padding: '8px 16px',
          background: isPlaying ? '#555' : 'var(--accent-color, #e94560)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: isPlaying ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        Play
      </button>
      <button
        onClick={pause}
        disabled={!isPlaying}
        style={{
          padding: '8px 16px',
          background: !isPlaying ? '#555' : 'var(--accent-color, #e94560)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: !isPlaying ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        Pause
      </button>
      <button
        onClick={stop}
        style={{
          padding: '8px 16px',
          background: 'var(--bg-secondary, #0f3460)',
          color: 'var(--text-primary, #fff)',
          border: '1px solid var(--accent-color, #e94560)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        Stop
      </button>
    </div>
  )
}
