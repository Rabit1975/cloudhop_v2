import React from 'react'
import { Logo } from './Logo'

export function LogoLoader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '20px'
    }}>
      <Logo size={60} />
      <div style={{
        width: '200px',
        height: '4px',
        backgroundColor: '#e0e0e0',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          animation: 'loading 1.5s infinite'
        }} />
      </div>
    </div>
  )
}
