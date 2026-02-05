export type MusicRuleType = 'host-only' | 'democratic' | 'queue-based' | 'auto'

export interface SpaceMusicRules {
  spaceId: string
  controlType: MusicRuleType
  allowGuestQueue: boolean
  allowVoting: boolean
  autoPlay: boolean
  maxQueueSize: number
  votingThreshold: number
}

export const defaultMusicRules: SpaceMusicRules = {
  spaceId: '',
  controlType: 'host-only',
  allowGuestQueue: false,
  allowVoting: false,
  autoPlay: false,
  maxQueueSize: 50,
  votingThreshold: 3
}

export function getMusicRulesForSpaceType(spaceType: string): Partial<SpaceMusicRules> {
  switch (spaceType) {
    case 'social':
      return {
        controlType: 'democratic',
        allowGuestQueue: true,
        allowVoting: true,
        autoPlay: true
      }
    case 'focus':
      return {
        controlType: 'host-only',
        allowGuestQueue: false,
        allowVoting: false,
        autoPlay: true
      }
    case 'gaming':
      return {
        controlType: 'queue-based',
        allowGuestQueue: true,
        allowVoting: true,
        autoPlay: true
      }
    default:
      return {
        controlType: 'host-only',
        allowGuestQueue: false,
        allowVoting: false,
        autoPlay: false
      }
  }
}
