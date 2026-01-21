import { UserRole } from '../shared/UserRole'

export interface DJPermissions {
  canAddToQueue: boolean
  canRemoveFromQueue: boolean
  canReorderQueue: boolean
  canSkipTrack: boolean
  canControlPlayback: boolean
}

export function getDJPermissions(role: UserRole): DJPermissions {
  switch (role) {
    case 'host':
      return {
        canAddToQueue: true,
        canRemoveFromQueue: true,
        canReorderQueue: true,
        canSkipTrack: true,
        canControlPlayback: true
      }
    case 'dj':
      return {
        canAddToQueue: true,
        canRemoveFromQueue: true,
        canReorderQueue: true,
        canSkipTrack: true,
        canControlPlayback: true
      }
    case 'guest':
      return {
        canAddToQueue: true,
        canRemoveFromQueue: false,
        canReorderQueue: false,
        canSkipTrack: false,
        canControlPlayback: false
      }
    case 'viewer':
    default:
      return {
        canAddToQueue: false,
        canRemoveFromQueue: false,
        canReorderQueue: false,
        canSkipTrack: false,
        canControlPlayback: false
      }
  }
}
