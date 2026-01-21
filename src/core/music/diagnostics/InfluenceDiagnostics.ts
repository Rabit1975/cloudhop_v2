export interface InfluenceDiagnosticInfo {
  isActive: boolean
  currentProfile: any
  updateInterval: number
}

export function getInfluenceDiagnostics(scheduler: any): InfluenceDiagnosticInfo {
  if (!scheduler) {
    return {
      isActive: false,
      currentProfile: null,
      updateInterval: 0
    }
  }

  return {
    isActive: scheduler.isRunning ? scheduler.isRunning() : false,
    currentProfile: (scheduler as any).lastProfile || null,
    updateInterval: (scheduler as any).updateInterval || 0
  }
}

export function formatInfluenceDiagnostics(info: InfluenceDiagnosticInfo): string {
  return `
Influence Engine Diagnostics:
- Active: ${info.isActive}
- Current Profile: ${info.currentProfile ? JSON.stringify(info.currentProfile) : 'None'}
- Update Interval: ${info.updateInterval}ms
  `.trim()
}
