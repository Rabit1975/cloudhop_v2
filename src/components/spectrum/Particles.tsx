import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { spectrumStateManager } from '../../core/spectrum/SpectrumState'
import { particleVertexShader, particleFragmentShader } from './Shaders'

export const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const particleCount = 2000

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Random position in sphere
      const radius = Math.random() * 25 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Random size
      sizes[i] = Math.random() * 2 + 0.5

      // Random color (will be overridden by spectrum state)
      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.7, 0.6)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return { positions, sizes, colors }
  }, [])

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      bass: { value: 0 },
      energy: { value: 0 },
      scale: { value: 1.0 }
    }),
    []
  )

  // Subscribe to spectrum state changes
  useEffect(() => {
    const unsubscribe = spectrumStateManager.subscribe((state) => {
      if (materialRef.current) {
        materialRef.current.uniforms.bass.value = state.bass
        materialRef.current.uniforms.energy.value = state.energy
      }

      // Update particle colors based on spectrum state
      if (pointsRef.current) {
        const geometry = pointsRef.current.geometry
        const colorAttribute = geometry.getAttribute('color') as THREE.BufferAttribute
        
        if (colorAttribute) {
          const color1 = new THREE.Color(state.primaryColor)
          const color2 = new THREE.Color(state.secondaryColor)
          const color3 = new THREE.Color(state.accentColor)

          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3
            const rand = Math.random()
            
            let color: THREE.Color
            if (rand < 0.33) {
              color = color1
            } else if (rand < 0.66) {
              color = color2
            } else {
              color = color3
            }

            colorAttribute.setXYZ(i, color.r, color.g, color.b)
          }

          colorAttribute.needsUpdate = true
        }
      }
    })

    return unsubscribe
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }

    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y += 0.0002
      pointsRef.current.rotation.x += 0.0001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
