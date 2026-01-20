import React, { useState } from 'react'
import YouTubeMusicPlayer from './YouTubeMusicPlayer'
import { useMusicEngine } from './useMusicEngine'

interface MusicChannelProps {
  channelId: string
}

export default function MusicChannel({ channelId }: MusicChannelProps) {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    play,
    pause,
    skip,
    setVolume
  } = useMusicEngine(channelId)

  const [showPlayer, setShowPlayer] = useState(true)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0f3460',
      color: '#fff'
    }}>
      {/* YouTube Player (hidden) */}
      {showPlayer && (
        <YouTubeMusicPlayer
          videoId={currentTrack?.id}
          autoPlay={false}
          volume={volume}
          onReady={() => console.log('Player ready')}
        />
      )}

      {/* Now Playing */}
      <div style={{
        padding: '32px',
        background: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
        borderBottom: '1px solid rgba(233, 69, 96, 0.2)'
      }}>
        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>
          NOW PLAYING
        </div>
        {currentTrack ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '8px',
              background: currentTrack.thumbnail
                ? `url(${currentTrack.thumbnail}) center/cover`
                : '#1a1a2e',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                {currentTrack.title}
              </div>
              <div style={{ fontSize: '18px', opacity: 0.7 }}>
                {currentTrack.artist}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.5, marginTop: '8px' }}>
                {formatTime(currentTime)} / {formatTime(currentTrack.duration)}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '18px', opacity: 0.5 }}>
            No track playing
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{
        padding: '24px 32px',
        background: '#16213e',
        borderBottom: '1px solid rgba(233, 69, 96, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Play/Pause */}
        <button
          onClick={isPlaying ? pause : play}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#e94560',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Skip */}
        <button
          onClick={skip}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#1a1a2e',
            border: '1px solid rgba(233, 69, 96, 0.3)',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ⏭
        </button>

        {/* Volume */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ opacity: 0.7, minWidth: '60px' }}>🔊 {volume}%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{
              flex: 1,
              height: '4px',
              background: `linear-gradient(to right, #e94560 0%, #e94560 ${volume}%, #1a1a2e ${volume}%, #1a1a2e 100%)`,
              outline: 'none',
              border: 'none',
              borderRadius: '2px'
            }}
          />
        </div>
      </div>

      {/* Queue */}
      <div style={{
        flex: 1,
        padding: '24px 32px',
        overflowY: 'auto'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          Queue
        </div>
        <div style={{ opacity: 0.5, textAlign: 'center', padding: '40px 0' }}>
          No tracks in queue
        </div>
      </div>
    </div>
  )
}
