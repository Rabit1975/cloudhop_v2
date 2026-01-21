import React from 'react'

interface Track {
  title: string
  artist: string
  thumbnail?: string
}

interface NowPlayingRibbonProps {
  track: Track | null
  isPlaying: boolean
  onPlayPause?: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export const NowPlayingRibbon: React.FC<NowPlayingRibbonProps> = ({
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious
}) => {
  if (!track) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'rgba(20, 20, 30, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 1000,
        gap: '16px'
      }}
    >
      {track.thumbnail && (
        <img
          src={track.thumbnail}
          alt={track.title}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '8px',
            objectFit: 'cover'
          }}
        />
      )}
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#fff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {track.title}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {track.artist}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {onPrevious && (
          <button
            onClick={onPrevious}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            ⏮
          </button>
        )}
        
        {onPlayPause && (
          <button
            onClick={onPlayPause}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              background: '#fff',
              color: '#000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        )}
        
        {onNext && (
          <button
            onClick={onNext}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            ⏭
          </button>
        )}
      </div>
    </div>
  )
}
