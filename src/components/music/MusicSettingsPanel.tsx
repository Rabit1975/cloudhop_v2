import React, { useState } from 'react'
import { useMusicEngineContext } from '../../core/music/MusicEngineProvider'

export function MusicSettingsPanel() {
  const { settings } = useMusicEngineContext()
  const [localSettings, setLocalSettings] = useState(settings)

  return (
    <div style={{
      background: 'var(--bg-primary, #16213e)',
      borderRadius: '12px',
      padding: '16px',
      minWidth: '320px'
    }}>
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'var(--text-primary, #fff)',
        borderBottom: '2px solid var(--accent-color, #e94560)',
        paddingBottom: '8px',
        marginBottom: '16px'
      }}>
        Music Settings
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            color: 'var(--text-primary, #fff)',
            fontSize: '14px',
            marginBottom: '8px'
          }}>
            Crossfade Duration (ms)
          </label>
          <input
            type="number"
            value={localSettings.crossfadeDuration}
            onChange={(e) => setLocalSettings({
              ...localSettings,
              crossfadeDuration: parseInt(e.target.value)
            })}
            style={{
              width: '100%',
              padding: '8px',
              background: 'var(--bg-secondary, #0f3460)',
              border: '1px solid var(--accent-color, #e94560)',
              borderRadius: '4px',
              color: 'var(--text-primary, #fff)',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary, #fff)',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={localSettings.autoPlay}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                autoPlay: e.target.checked
              })}
              style={{
                accentColor: 'var(--accent-color, #e94560)'
              }}
            />
            Auto Play
          </label>
        </div>

        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary, #fff)',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={localSettings.syncEnabled}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                syncEnabled: e.target.checked
              })}
              style={{
                accentColor: 'var(--accent-color, #e94560)'
              }}
            />
            Sync Enabled
          </label>
        </div>

        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary, #fff)',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={localSettings.preloadNext}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                preloadNext: e.target.checked
              })}
              style={{
                accentColor: 'var(--accent-color, #e94560)'
              }}
            />
            Preload Next Track
          </label>
        </div>

        <div>
          <label style={{
            display: 'block',
            color: 'var(--text-primary, #fff)',
            fontSize: '14px',
            marginBottom: '8px'
          }}>
            Preferred Transport
          </label>
          <select
            value={localSettings.preferredTransport}
            onChange={(e) => setLocalSettings({
              ...localSettings,
              preferredTransport: e.target.value as 'audio' | 'youtube'
            })}
            style={{
              width: '100%',
              padding: '8px',
              background: 'var(--bg-secondary, #0f3460)',
              border: '1px solid var(--accent-color, #e94560)',
              borderRadius: '4px',
              color: 'var(--text-primary, #fff)',
              fontSize: '14px'
            }}
          >
            <option value="audio">Audio Element</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
      </div>
    </div>
  )
}
