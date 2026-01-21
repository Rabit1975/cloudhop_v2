import React from 'react'
import { routes } from '@kernel/routing/routes'

export function Sidebar() {
  const navItems = [
    { path: routes.chat, label: 'Chat', icon: '💬' },
    { path: routes.meetings, label: 'Meetings', icon: '📹' },
    { path: routes.spaces, label: 'Spaces', icon: '🌌' },
    { path: routes.profile, label: 'Profile', icon: '👤' },
    { path: routes.settings, label: 'Settings', icon: '⚙️' },
    { path: routes.aiTools, label: 'AI Tools', icon: '🤖' }
  ]

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 700, 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        CloudHop OS
      </div>
      {navItems.map((item) => (
        <a
          key={item.path}
          href={item.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            borderRadius: '6px',
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
            transition: 'background-color 0.2s'
          }}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </aside>
  )
}
