import React, { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  footer?: ReactNode
}

export function Card({ title, children, footer }: CardProps) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      {title && (
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid #e0e0e0',
          fontWeight: 600,
          fontSize: '16px'
        }}>
          {title}
        </div>
      )}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
      {footer && (
        <div style={{
          padding: '15px 20px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa'
        }}>
          {footer}
        </div>
      )}
    </div>
  )
}
