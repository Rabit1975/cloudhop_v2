import React, { ReactNode, CSSProperties } from 'react'

interface FlexProps {
  children: ReactNode
  direction?: 'row' | 'column'
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  gap?: number
  style?: CSSProperties
}

export function Flex({ 
  children, 
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  gap = 0,
  style = {}
}: FlexProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      gap: `${gap}px`,
      ...style
    }}>
      {children}
    </div>
  )
}
