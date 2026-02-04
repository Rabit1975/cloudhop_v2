// SpectrumRuntime - React component that integrates Music/Space/Theme/Leonardo into unified emotional state

import React, { useEffect, useState } from 'react'
import { spectrumStateManager } from './SpectrumState'
import { audioAnalyzer, AudioFeatures } from './AudioAnalyzer'
import { fuseMoods, MusicInfluence, SpaceInfluence, ThemeInfluence, LeonardoInfluence } from '../spaces/music/fuseMoods'

interface SpectrumRuntimeProps {
  audioElement?: HTMLAudioElement | null
  spaceType?: 'nebula' | 'void' | 'cluster' | 'gateway'
  spaceIntensity?: number
  isDarkMode?: boolean
  accentColor?: string
  leonardoActive?: boolean
  leonardoResonance?: number
  children?: React.ReactNode
}

export const SpectrumRuntime: React.FC<SpectrumRuntimeProps> = ({
  audioElement,
  spaceType = 'nebula',
  spaceIntensity = 0.7,
  isDarkMode = true,
  accentColor = '#6366f1',
  leonardoActive = false,
  leonardoResonance = 0,
  children
}) => {
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures | null>(null)

  // Setup audio analyzer
  useEffect(() => {
    if (!audioElement) {
      // Try to find first audio element on page
      const firstAudio = document.querySelector('audio')
      if (firstAudio) {
        audioAnalyzer.attach(firstAudio)
      }
    } else {
      audioAnalyzer.attach(audioElement)
    }

    audioAnalyzer.start((features) => {
      setAudioFeatures(features)
      spectrumStateManager.updateAudioFeatures(features)
    })

    return () => {
      audioAnalyzer.stop()
    }
  }, [audioElement])

  // Update fused mood based on all influences
  useEffect(() => {
    if (!audioFeatures) return

    // Create music influence from audio features
    const musicInfluence: MusicInfluence = {
      valence: audioFeatures.energy > 0.6 ? 0.7 : 0.4,
      arousal: audioFeatures.energy,
      dominance: audioFeatures.bass,
      weight: 1.0
    }

    // Create space influence
    const spaceInfluence: SpaceInfluence = {
      type: spaceType,
      intensity: spaceIntensity,
      weight: 0.5
    }

    // Create theme influence
    const themeInfluence: ThemeInfluence = {
      isDarkMode,
      accentColor,
      weight: 0.3
    }

    // Create Leonardo influence
    const leonardoInfluence: LeonardoInfluence = {
      glyphActive: leonardoActive,
      resonance: leonardoResonance,
      weight: leonardoActive ? 0.8 : 0
    }

    // Fuse all moods
    const fusedMood = fuseMoods(
      musicInfluence,
      spaceInfluence,
      themeInfluence,
      leonardoInfluence
    )

    // Update spectrum state with fused results
    spectrumStateManager.updateEmotionalState(fusedMood.emotionalState)
    spectrumStateManager.updateColors({
      primaryColor: fusedMood.blendedColors.primary,
      secondaryColor: fusedMood.blendedColors.secondary,
      accentColor: fusedMood.blendedColors.accent,
      glowColor: fusedMood.blendedColors.glow
    })

    // Update visual parameters based on emotional state
    spectrumStateManager.setState({
      nebulaIntensity: fusedMood.emotionalState.arousal,
      orbitSpeed: fusedMood.emotionalState.arousal * 2,
      glyphResonance: leonardoResonance,
      particleCount: Math.floor(1000 + fusedMood.emotionalState.arousal * 1000),
    })
  }, [
    audioFeatures,
    spaceType,
    spaceIntensity,
    isDarkMode,
    accentColor,
    leonardoActive,
    leonardoResonance
  ])

  return <>{children}</>
}
