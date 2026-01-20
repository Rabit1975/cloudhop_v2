import React, { useEffect } from 'react'
import { useMusicEngine } from '../../core/music/useMusicEngine'

export function VolumeControl() {
  const { volume, setVolume } = useMusicEngine()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px'
    }}>
      <span style={{ color: 'var(--text-primary, #fff)', fontSize: '14px' }}>
        🔊
      </span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        style={{
          flex: 1,
          accentColor: 'var(--accent-color, #e94560)'
        }}
      />
      <span style={{ color: 'var(--text-secondary, #aaa)', fontSize: '12px', minWidth: '40px' }}>
        {Math.round(volume * 100)}%
      </span>
    </div>
  )
}
