import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { spectrumStateManager } from '../../core/spectrum/SpectrumState'

interface Orbit {
  radius: number
  speed: number
  offset: number
  color: THREE.Color
}

export const SpaceOrbits: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const orbitsRef = useRef<Orbit[]>([])
  const orbitLinesRef = useRef<THREE.Line[]>([])
  const orbiterMeshesRef = useRef<THREE.Mesh[]>([])

  // Initialize orbits
  useEffect(() => {
    if (!groupRef.current) return

    const orbitCount = 5
    const orbits: Orbit[] = []
    const orbitLines: THREE.Line[] = []
    const orbiterMeshes: THREE.Mesh[] = []

    for (let i = 0; i < orbitCount; i++) {
      const radius = 8 + i * 3
      const speed = 0.5 + Math.random() * 0.5
      const offset = Math.random() * Math.PI * 2

      orbits.push({
        radius,
        speed,
        offset,
        color: new THREE.Color().setHSL(i / orbitCount, 0.7, 0.6)
      })

      // Create orbit line
      const points = []
      const segments = 64
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        )
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: orbits[i].color,
        transparent: true,
        opacity: 0.2
      })
      const line = new THREE.Line(geometry, material)
      orbitLines.push(line)
      groupRef.current.add(line)

      // Create orbiter
      const orbiterGeometry = new THREE.SphereGeometry(0.3, 16, 16)
      const orbiterMaterial = new THREE.MeshBasicMaterial({
        color: orbits[i].color,
        transparent: true,
        opacity: 0.8
      })
      const orbiter = new THREE.Mesh(orbiterGeometry, orbiterMaterial)
      orbiterMeshes.push(orbiter)
      groupRef.current.add(orbiter)
    }

    orbitsRef.current = orbits
    orbitLinesRef.current = orbitLines
    orbiterMeshesRef.current = orbiterMeshes

    return () => {
      // Cleanup
      orbitLines.forEach(line => {
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
      })
      orbiterMeshes.forEach(mesh => {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
      })
    }
  }, [])

  // Subscribe to spectrum state
  useEffect(() => {
    const unsubscribe = spectrumStateManager.subscribe((state) => {
      // Update orbit colors based on spectrum
      const color1 = new THREE.Color(state.primaryColor)
      const color2 = new THREE.Color(state.secondaryColor)
      const color3 = new THREE.Color(state.accentColor)

      orbitsRef.current.forEach((orbit, i) => {
        const factor = i / orbitsRef.current.length
        let color: THREE.Color
        
        if (factor < 0.33) {
          color = color1
        } else if (factor < 0.66) {
          color = color2
        } else {
          color = color3
        }

        orbit.color.copy(color)

        if (orbitLinesRef.current[i]) {
          ;(orbitLinesRef.current[i].material as THREE.LineBasicMaterial).color.copy(color)
        }

        if (orbiterMeshesRef.current[i]) {
          ;(orbiterMeshesRef.current[i].material as THREE.MeshBasicMaterial).color.copy(color)
        }
      })
    })

    return unsubscribe
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    const spectrumState = spectrumStateManager.getState()
    const speedMultiplier = spectrumState.orbitSpeed

    orbitsRef.current.forEach((orbit, i) => {
      const angle = state.clock.elapsedTime * orbit.speed * speedMultiplier + orbit.offset
      const x = Math.cos(angle) * orbit.radius
      const y = Math.sin(angle) * orbit.radius

      if (orbiterMeshesRef.current[i]) {
        orbiterMeshesRef.current[i].position.set(x, y, 0)
        
        // Pulse with bass
        const scale = 1 + spectrumState.bass * 0.5
        orbiterMeshesRef.current[i].scale.setScalar(scale)
      }
    })

    // Rotate entire group
    groupRef.current.rotation.z += 0.0001
  })

  return <group ref={groupRef} />
}
