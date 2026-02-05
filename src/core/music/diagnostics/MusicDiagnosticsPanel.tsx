import React, { useState, useEffect } from 'react'
import { getMusicDiagnostics, formatMusicDiagnostics } from './MusicDiagnostics'
import { getDJDiagnostics, formatDJDiagnostics } from './DJDiagnostics'
import { useMusicEngineContext } from '../MusicEngineProvider'
import { getTransportDiagnostics, formatTransportDiagnostics } from './TransportDiagnostics'

export function MusicDiagnosticsPanel() {
  const [diagnostics, setDiagnostics] = useState('')
  const { transportRef } = useMusicEngineContext()

  useEffect(() => {
    const refresh = async () => {
      const musicInfo = getMusicDiagnostics()
      const djInfo = getDJDiagnostics()
      const transportInfo = await getTransportDiagnostics(transportRef.current)

      const output = [
        formatMusicDiagnostics(musicInfo),
        '',
        formatTransportDiagnostics(transportInfo),
        '',
        formatDJDiagnostics(djInfo)
      ].join('\n')

      setDiagnostics(output)
    }

    refresh()
    const interval = setInterval(refresh, 2000)
    return () => clearInterval(interval)
  }, [transportRef])

  const handleManualRefresh = async () => {
    const musicInfo = getMusicDiagnostics()
    const djInfo = getDJDiagnostics()
    const transportInfo = await getTransportDiagnostics(transportRef.current)

    const output = [
      formatMusicDiagnostics(musicInfo),
      '',
      formatTransportDiagnostics(transportInfo),
      '',
      formatDJDiagnostics(djInfo)
    ].join('\n')

    setDiagnostics(output)
  }

  return (
    <div style={{
      background: 'var(--bg-primary, #16213e)',
      borderRadius: '12px',
      padding: '16px',
      minWidth: '400px',
      maxWidth: '600px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid var(--accent-color, #e94560)',
        paddingBottom: '8px',
        marginBottom: '16px'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'var(--text-primary, #fff)'
        }}>
          Music Diagnostics
        </div>
        <button
          onClick={handleManualRefresh}
          style={{
            padding: '6px 12px',
            background: 'var(--accent-color, #e94560)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          Refresh
        </button>
      </div>

      <pre style={{
        background: 'var(--bg-secondary, #0f3460)',
        padding: '12px',
        borderRadius: '8px',
        color: 'var(--text-primary, #fff)',
        fontSize: '12px',
        fontFamily: 'monospace',
        overflow: 'auto',
        maxHeight: '500px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}>
        {diagnostics || 'Loading diagnostics...'}
      </pre>
    </div>
  )
}
