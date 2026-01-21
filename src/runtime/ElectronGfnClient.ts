// Electron GFN (GeForce NOW) Client for CloudHop

interface GfnStatus {
  connected: boolean
  streaming: boolean
  currentGame?: string
  quality?: string
}

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  thumbnail?: string
}

class ElectronGfnClient {
  private isElectron: boolean

  constructor() {
    this.isElectron = typeof window !== 'undefined' && !!(window as any).cloudhop
  }

  // GFN Methods
  async connect(): Promise<boolean> {
    if (!this.isElectron) return false
    try {
      return await (window as any).cloudhop.gfn.connect()
    } catch (error) {
      console.error('GFN connect error:', error)
      return false
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.gfn.disconnect()
    } catch (error) {
      console.error('GFN disconnect error:', error)
    }
  }

  async getStatus(): Promise<GfnStatus | null> {
    if (!this.isElectron) return null
    try {
      return await (window as any).cloudhop.gfn.getStatus()
    } catch (error) {
      console.error('GFN get status error:', error)
      return null
    }
  }

  async startStream(gameId: string): Promise<boolean> {
    if (!this.isElectron) return false
    try {
      return await (window as any).cloudhop.gfn.startStream(gameId)
    } catch (error) {
      console.error('GFN start stream error:', error)
      return false
    }
  }

  async stopStream(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.gfn.stopStream()
    } catch (error) {
      console.error('GFN stop stream error:', error)
    }
  }

  async setQuality(quality: string): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.gfn.setQuality(quality)
    } catch (error) {
      console.error('GFN set quality error:', error)
    }
  }

  // Music Methods
  async playMusic(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.music.play()
    } catch (error) {
      console.error('Music play error:', error)
    }
  }

  async pauseMusic(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.music.pause()
    } catch (error) {
      console.error('Music pause error:', error)
    }
  }

  async stopMusic(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.music.stop()
    } catch (error) {
      console.error('Music stop error:', error)
    }
  }

  async nextTrack(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.music.next()
    } catch (error) {
      console.error('Music next error:', error)
    }
  }

  async previousTrack(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.music.previous()
    } catch (error) {
      console.error('Music previous error:', error)
    }
  }

  async setVolume(volume: number): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.music.setVolume(volume)
    } catch (error) {
      console.error('Music set volume error:', error)
    }
  }

  async loadTrack(track: Track): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.music.loadTrack(track)
    } catch (error) {
      console.error('Music load track error:', error)
    }
  }

  // System Methods
  async minimizeWindow(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.system.minimize()
    } catch (error) {
      console.error('System minimize error:', error)
    }
  }

  async maximizeWindow(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.system.maximize()
    } catch (error) {
      console.error('System maximize error:', error)
    }
  }

  async closeWindow(): Promise<void> {
    if (!this.isElectron) return
    try {
      await (window as any).cloudhop.system.close()
    } catch (error) {
      console.error('System close error:', error)
    }
  }
}

// Export singleton instance
export const electronGfnClient = new ElectronGfnClient()
