import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { spectrumStateManager } from '../../core/spectrum/SpectrumState'
import { nebulaVertexShader, nebulaFragmentShader } from './Shaders'

export const Nebula: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 0.5 },
      color1: { value: new THREE.Color('#6366f1') },
      color2: { value: new THREE.Color('#8b5cf6') },
      color3: { value: new THREE.Color('#ec4899') },
      bass: { value: 0 },
      energy: { value: 0 }
    }),
    []
  )

  // Subscribe to spectrum state changes
  useEffect(() => {
    const unsubscribe = spectrumStateManager.subscribe((state) => {
      if (materialRef.current) {
        materialRef.current.uniforms.intensity.value = state.nebulaIntensity
        materialRef.current.uniforms.bass.value = state.bass
        materialRef.current.uniforms.energy.value = state.energy
        
        materialRef.current.uniforms.color1.value.set(state.primaryColor)
        materialRef.current.uniforms.color2.value.set(state.secondaryColor)
        materialRef.current.uniforms.color3.value.set(state.accentColor)
      }
    })

    return unsubscribe
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }

    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.z += 0.0005
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
