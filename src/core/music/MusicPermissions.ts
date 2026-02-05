import { UserRole } from './shared/UserRole'

export interface MusicPermissions {
  canControlPlayback: boolean
  canModifyQueue: boolean
  canChangeSettings: boolean
  canSkip: boolean
}

export function getMusicPermissions(role: UserRole): MusicPermissions {
  switch (role) {
    case 'host':
    case 'dj':
      return {
        canControlPlayback: true,
        canModifyQueue: true,
        canChangeSettings: true,
        canSkip: true
      }
    case 'guest':
      return {
        canControlPlayback: false,
        canModifyQueue: true,
        canChangeSettings: false,
        canSkip: false
      }
    case 'viewer':
    default:
      return {
        canControlPlayback: false,
        canModifyQueue: false,
        canChangeSettings: false,
        canSkip: false
      }
  }
}

export function canControlPlayback(role: UserRole): boolean {
  return getMusicPermissions(role).canControlPlayback
}

export function canModifyQueue(role: UserRole): boolean {
  return getMusicPermissions(role).canModifyQueue
}
