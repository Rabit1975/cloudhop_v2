import { useEffect } from 'react'
import { useMusicInfluenceEngine } from '../../music/influence/MusicInfluenceEngine'
import { InfluenceProfile } from '../../music/influence/InfluenceProfiles'

export function useSpaceThemeInfluence(
  onThemeChange?: (colors: { primary: string; secondary: string }) => void,
  enabled = true
) {
  const handleInfluence = (profile: InfluenceProfile) => {
    const { mood } = profile

    let primary = '#3498db'
    let secondary = '#2ecc71'

    switch (mood) {
      case 'energetic':
        primary = '#e74c3c'
        secondary = '#f39c12'
        break
      case 'calm':
        primary = '#3498db'
        secondary = '#9b59b6'
        break
      case 'dark':
        primary = '#2c3e50'
        secondary = '#34495e'
        break
      case 'bright':
        primary = '#f1c40f'
        secondary = '#e67e22'
        break
    }

    if (onThemeChange) {
      onThemeChange({ primary, secondary })
    }
  }

  const { isActive } = useMusicInfluenceEngine({
    onInfluence: handleInfluence,
    enabled
  })

  return {
    isActive
  }
}
