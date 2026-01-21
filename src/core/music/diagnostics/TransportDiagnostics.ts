export interface TransportDiagnosticInfo {
  type: string
  isInitialized: boolean
  supportsSeek: boolean
  supportsVolume: boolean
}

export async function getTransportDiagnostics(transport: any): Promise<TransportDiagnosticInfo> {
  if (!transport) {
    return {
      type: 'None',
      isInitialized: false,
      supportsSeek: false,
      supportsVolume: false
    }
  }

  return {
    type: transport.constructor.name || 'Unknown',
    isInitialized: true,
    supportsSeek: typeof transport.seek === 'function',
    supportsVolume: typeof transport.setVolume === 'function'
  }
}

export function formatTransportDiagnostics(info: TransportDiagnosticInfo): string {
  return `
Transport Diagnostics:
- Type: ${info.type}
- Initialized: ${info.isInitialized}
- Supports Seek: ${info.supportsSeek}
- Supports Volume: ${info.supportsVolume}
  `.trim()
}
