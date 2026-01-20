import React from 'react'
import { useDJQueue } from '../../core/music/dj/DJQueue'

export function DJQueuePanel() {
  const queue = useDJQueue((state) => state.queue)
  const remove = useDJQueue((state) => state.remove)

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
        DJ Queue ({queue.length})
      </div>
      
      {queue.length === 0 ? (
        <div style={{
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-secondary, #aaa)',
          fontSize: '14px'
        }}>
          Queue is empty
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {queue.map((item, index) => (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-secondary, #0f3460)',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--accent-color, #e94560)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#fff'
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  color: 'var(--text-primary, #fff)',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {item.track.title}
                </div>
                <div style={{
                  color: 'var(--text-secondary, #aaa)',
                  fontSize: '12px'
                }}>
                  {item.track.artist}
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  color: 'var(--text-secondary, #aaa)',
                  fontSize: '12px'
                }}>
                  ⬆️ {item.votes}
                </span>
                <button
                  onClick={() => remove(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-color, #e94560)',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '4px'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
