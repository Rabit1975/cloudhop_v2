import { useState, useEffect } from 'react'
import { SpaceMusicRules, getMusicRulesForSpaceType } from './SpaceMusicRules'

export function useSpaceDJRules(spaceId: string, spaceType: string) {
  const [rules, setRules] = useState<SpaceMusicRules>(() => ({
    spaceId,
    ...getMusicRulesForSpaceType(spaceType)
  }) as SpaceMusicRules)

  useEffect(() => {
    // In production, load rules from backend
    const defaultRules = getMusicRulesForSpaceType(spaceType)
    setRules({ spaceId, ...defaultRules } as SpaceMusicRules)
  }, [spaceId, spaceType])

  const updateRules = (updates: Partial<SpaceMusicRules>) => {
    setRules((prev) => ({ ...prev, ...updates }))
  }

  return {
    rules,
    updateRules
  }
}
