import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { spectrumStateManager } from '../../core/spectrum/SpectrumState'
import { glyphVertexShader, glyphFragmentShader } from './Shaders'

export const LeonardoGlyph: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resonance: { value: 0 },
      glowColor: { value: new THREE.Color('#7dd3fc') }
    }),
    []
  )

  // Subscribe to spectrum state changes
  useEffect(() => {
    const unsubscribe = spectrumStateManager.subscribe((state) => {
      if (materialRef.current) {
        materialRef.current.uniforms.resonance.value = state.glyphResonance
        materialRef.current.uniforms.glowColor.value.set(state.glowColor)
      }
    })

    return unsubscribe
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }

    if (meshRef.current) {
      const spectrumState = spectrumStateManager.getState()
      
      // Rotate based on resonance
      meshRef.current.rotation.z += 0.001 * (1 + spectrumState.glyphResonance)
      
      // Float up and down
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      
      // Pulse scale with energy
      const scale = 1 + spectrumState.energy * 0.3
      meshRef.current.scale.setScalar(scale)
    }
  })

  // Create sacred geometry shape
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const sides = 6
    const radius = 3

    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      if (i === 0) {
        shape.moveTo(x, y)
      } else {
        shape.lineTo(x, y)
      }
    }

    return new THREE.ShapeGeometry(shape)
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={glyphVertexShader}
        fragmentShader={glyphFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
