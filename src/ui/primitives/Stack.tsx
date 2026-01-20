import React, { ReactNode, CSSProperties } from 'react'

interface StackProps {
  children: ReactNode
  spacing?: number
  direction?: 'vertical' | 'horizontal'
  style?: CSSProperties
}

export function Stack({ 
  children, 
  spacing = 10,
  direction = 'vertical',
  style = {}
}: StackProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap: `${spacing}px`,
      ...style
    }}>
      {children}
    </div>
  )
}
