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
  showNebula = true,
  showParticles = true,
  showOrbits = true,
  showGlyph = false,
  backgroundColor = '#000000'
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: backgroundColor }}
      >
        <Suspense fallback={null}>
          {showNebula && <Nebula />}
          {showParticles && <Particles />}
          {showOrbits && <SpaceOrbits />}
          {showGlyph && <LeonardoGlyph />}
          
          {/* Ambient light for visibility */}
          <ambientLight intensity={0.5} />
          
          {/* Point lights for dynamic effects */}
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
