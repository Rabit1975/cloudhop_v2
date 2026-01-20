import React from 'react'

interface LogoProps {
  size?: number
  variant?: 'full' | 'icon'
}

export function Logo({ size = 40, variant = 'full' }: LogoProps) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      fontSize: `${size}px`
    }}>
      {/* Logo icon */}
      <div style={{ 
        width: size, 
        height: size, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700
      }}>
        C
      </div>
      {variant === 'full' && (
        <span style={{ fontWeight: 700 }}>CloudHop</span>
      )}
    </div>
  )
}
