import React, { useState } from 'react'
import { usePresence } from '../../kernel/hooks/usePresence'
import type { PresenceStatus } from '../../kernel/hooks/usePresence'

export default function ProfilePopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<PresenceStatus>('online')
  usePresence(status)

  const statusOptions: { value: PresenceStatus; label: string; emoji: string }[] = [
    { value: 'online', label: 'Online', emoji: '🟢' },
    { value: 'idle', label: 'Away', emoji: '🟡' },
    { value: 'in_call', label: 'Do Not Disturb', emoji: '🔴' },
    { value: 'offline', label: 'Invisible', emoji: '⚫' }
  ]

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#0f3460',
          border: '2px solid #e94560',
          cursor: 'pointer',
          fontSize: 18
        }}
      >
        👤
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 8,
            width: 240,
            backgroundColor: '#16213e',
            border: '1px solid #0f3460',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            padding: 12,
            zIndex: 1000
          }}
        >
          <div style={{ marginBottom: 12, padding: 8, borderBottom: '1px solid #0f3460' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Your Profile</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>user@cloudhop.com</div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 8 }}>Status</div>
            {statusOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  setStatus(opt.value)
                  setIsOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: 8,
                  marginBottom: 4,
                  backgroundColor: status === opt.value ? '#0f3460' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              padding: 10,
              marginTop: 8,
              backgroundColor: '#e94560',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Settings
          </button>

          <button
            onClick={() => {
              setIsOpen(false)
              // Handle sign out
            }}
            style={{
              width: '100%',
              padding: 10,
              marginTop: 8,
              backgroundColor: 'transparent',
              border: '1px solid #0f3460',
              borderRadius: 8,
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
