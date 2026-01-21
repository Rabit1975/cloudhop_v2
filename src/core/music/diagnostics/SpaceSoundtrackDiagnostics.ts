export interface SpaceSoundtrackDiagnosticInfo {
  spaceId: string
  soundtrackType: string | null
  isActive: boolean
  trackCount: number
}

export function getSpaceSoundtrackDiagnostics(soundtrack: any): SpaceSoundtrackDiagnosticInfo {
  if (!soundtrack) {
    return {
      spaceId: 'None',
      soundtrackType: null,
      isActive: false,
      trackCount: 0
    }
  }

  return {
    spaceId: soundtrack.spaceId || 'Unknown',
    soundtrackType: soundtrack.type || null,
    isActive: soundtrack.isActive || false,
    trackCount: soundtrack.tracks?.length || 0
  }
}

export function formatSpaceSoundtrackDiagnostics(info: SpaceSoundtrackDiagnosticInfo): string {
  return `
Space Soundtrack Diagnostics:
- Space ID: ${info.spaceId}
- Type: ${info.soundtrackType || 'None'}
- Active: ${info.isActive}
- Track Count: ${info.trackCount}
  `.trim()
}
