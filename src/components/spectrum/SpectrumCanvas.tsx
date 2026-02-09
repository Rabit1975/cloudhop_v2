import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Nebula } from './Nebula'
import { Particles } from './Particles'
import { SpaceOrbits } from './SpaceOrbits'
import { LeonardoGlyph } from './LeonardoGlyph'

interface SpectrumCanvasProps {
  showNebula?: boolean
  showParticles?: boolean
  showOrbits?: boolean
  showGlyph?: boolean
  backgroundColor?: string
}

export const SpectrumCanvas: React.FC<SpectrumCanvasProps> = ({
  showNebula = false,
  showParticles = false,
  showOrbits = false,
  showGlyph = false,
  backgroundColor = '#000000'
}) => {
  // PERFORMANCE: Return empty div to kill WebGL context
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
        background: backgroundColor
      }}
    />
  )
}
