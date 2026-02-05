import { useEffect } from 'react'
import { useMusicInfluenceEngine } from '../../music/influence/MusicInfluenceEngine'
import { InfluenceProfile } from '../../music/influence/InfluenceProfiles'
import { applySpaceInfluence } from '../../music/influence/SpaceInfluenceBridge'

export function useSpaceMusicInfluence(spaceId: string, enabled = true) {
  const handleInfluence = (profile: InfluenceProfile) => {
    const spaceTheme = applySpaceInfluence(profile)
    
    // Apply theme to space (this would update space context)
    console.log('Applying music influence to space:', spaceId, spaceTheme)
    
    // In production, this would update space theme via context/store
  }

  const { isActive } = useMusicInfluenceEngine({
    onInfluence: handleInfluence,
    enabled
  })

  return {
    isActive
  }
}
