import React from 'react'
import { useMusicState, selectCurrentTrack, selectIsPlaying } from '../../core/music/MusicState'

export function NowPlayingWidget() {
  const currentTrack = useMusicState(selectCurrentTrack)
  const isPlaying = useMusicState(selectIsPlaying)

  if (!currentTrack) {
    return (
      <div style={{
        padding: '12px',
        background: 'var(--bg-secondary, #0f3460)',
        borderRadius: '8px',
        color: 'var(--text-secondary, #aaa)'
      }}>
        No track playing
      </div>
    )
  }

  return (
    <div style={{
      padding: '12px',
      background: 'var(--bg-secondary, #0f3460)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      {currentTrack.thumbnail && (
        <img
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '4px',
            objectFit: 'cover'
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div style={{
          color: 'var(--text-primary, #fff)',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {currentTrack.title}
        </div>
        <div style={{
          color: 'var(--text-secondary, #aaa)',
          fontSize: '12px'
        }}>
          {currentTrack.artist}
        </div>
      </div>
      {isPlaying && (
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--accent-color, #e94560)',
          animation: 'pulse 2s infinite'
        }} />
      )}
    </div>
  )
}
