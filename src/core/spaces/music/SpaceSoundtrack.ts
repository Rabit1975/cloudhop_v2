import { MusicTrack } from '../../music/MusicState'

export type SoundtrackType = 'ambient' | 'focus' | 'social' | 'gaming' | 'custom'

export interface SpaceSoundtrack {
  id: string
  spaceId: string
  type: SoundtrackType
  tracks: MusicTrack[]
  isActive: boolean
  shuffleEnabled: boolean
  repeatEnabled: boolean
}

export const defaultSoundtracks: Record<SoundtrackType, Partial<SpaceSoundtrack>> = {
  ambient: {
    type: 'ambient',
    shuffleEnabled: true,
    repeatEnabled: true
  },
  focus: {
    type: 'focus',
    shuffleEnabled: false,
    repeatEnabled: true
  },
  social: {
    type: 'social',
    shuffleEnabled: true,
    repeatEnabled: true
  },
  gaming: {
    type: 'gaming',
    shuffleEnabled: true,
    repeatEnabled: true
  },
  custom: {
    type: 'custom',
    shuffleEnabled: false,
    repeatEnabled: false
  }
}
