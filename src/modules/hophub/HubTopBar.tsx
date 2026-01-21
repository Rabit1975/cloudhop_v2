import React from 'react'

export default function HubTopBar({ channel }) {
  if (!channel) {
    return (
      <div style={{
        height: '60px',
        borderBottom: '1px solid #0f3460',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: '#16213e'
      }}>
        <span style={{ color: '#888', fontSize: '14px' }}>Select a channel to get started</span>
      </div>
    )
  }

  const typeIcon = channel.type === 'chat' ? '💬' : channel.type === 'meeting' ? '🎥' : '🌌'
  const typeLabel = channel.type === 'chat' ? 'Chat' : channel.type === 'meeting' ? 'Meeting' : 'Space'

  return (
    <div style={{
      height: '60px',
      borderBottom: '1px solid #0f3460',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: '#16213e'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '24px' }}>{typeIcon}</span>
        <div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '16px', fontWeight: 600 }}>
            {channel.name}
          </h3>
          <span style={{ color: '#888', fontSize: '12px' }}>{typeLabel}</span>
        </div>
      </div>
      {channel.description && (
        <span style={{ color: '#aaa', fontSize: '14px', fontStyle: 'italic' }}>
          {channel.description}
        </span>
      )}
    </div>
  )
}
