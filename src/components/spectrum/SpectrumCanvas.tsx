import React from 'react'

interface SpectrumCanvasProps {
  showNebula?: boolean
  showParticles?: boolean
  showOrbits?: boolean
  showGlyph?: boolean
  backgroundColor?: string
}

export const SpectrumCanvas: React.FC<SpectrumCanvasProps> = ({
  backgroundColor = '#000000'
}) => {
  // PERFORMANCE: WebGL context disabled to prevent freezing
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: backgroundColor,
        display: 'none' // Completely hide it
      }}
    />
  )
}
