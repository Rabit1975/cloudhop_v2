// Bootstrap runtime for CloudHop
// Initializes core services and prepares the application environment

import { electronGfnClient } from './ElectronGfnClient'

interface BootstrapConfig {
  enableMusic?: boolean
  enableGfn?: boolean
  enableAudioAnalysis?: boolean
}

class RuntimeBootstrap {
  private initialized = false
  private config: BootstrapConfig = {
    enableMusic: true,
    enableGfn: true,
    enableAudioAnalysis: true
  }

  async initialize(config?: Partial<BootstrapConfig>): Promise<void> {
    if (this.initialized) {
      console.warn('Runtime already initialized')
      return
    }

    if (config) {
      this.config = { ...this.config, ...config }
    }

    console.log('Initializing CloudHop Runtime...')

    // Check if running in Electron environment
    const isElectron = typeof window !== 'undefined' && !!(window as any).cloudhop

    if (isElectron) {
      console.log('Electron environment detected')
      
      // Initialize GFN if enabled
      if (this.config.enableGfn) {
        try {
          const status = await electronGfnClient.getStatus()
          console.log('GFN status:', status)
        } catch (error) {
          console.error('Failed to get GFN status:', error)
        }
      }

      // Initialize audio analysis if enabled
      if (this.config.enableAudioAnalysis) {
        try {
          if ((window as any).cloudhop.audio) {
            await (window as any).cloudhop.audio.startAnalysis()
            console.log('Audio analysis started')
          }
        } catch (error) {
          console.error('Failed to start audio analysis:', error)
        }
      }
    } else {
      console.log('Web environment detected')
    }

    this.initialized = true
    console.log('CloudHop Runtime initialized successfully')
  }

  async shutdown(): Promise<void> {
    if (!this.initialized) return

    console.log('Shutting down CloudHop Runtime...')

    const isElectron = typeof window !== 'undefined' && !!(window as any).cloudhop

    if (isElectron) {
      // Stop audio analysis
      if (this.config.enableAudioAnalysis) {
        try {
          if ((window as any).cloudhop.audio) {
            await (window as any).cloudhop.audio.stopAnalysis()
          }
        } catch (error) {
          console.error('Failed to stop audio analysis:', error)
        }
      }

      // Disconnect GFN
      if (this.config.enableGfn) {
        try {
          await electronGfnClient.disconnect()
        } catch (error) {
          console.error('Failed to disconnect GFN:', error)
        }
      }

      // Stop music
      if (this.config.enableMusic) {
        try {
          await electronGfnClient.stopMusic()
        } catch (error) {
          console.error('Failed to stop music:', error)
        }
      }
    }

    this.initialized = false
    console.log('CloudHop Runtime shut down')
  }

  isInitialized(): boolean {
    return this.initialized
  }

  getConfig(): BootstrapConfig {
    return { ...this.config }
  }
}

// Export singleton instance
export const runtimeBootstrap = new RuntimeBootstrap()

// Auto-initialize on module load (can be disabled if needed)
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    runtimeBootstrap.initialize().catch(error => {
      console.error('Failed to initialize runtime:', error)
    })
  })

  window.addEventListener('beforeunload', () => {
    runtimeBootstrap.shutdown().catch(error => {
      console.error('Failed to shutdown runtime:', error)
    })
  })
}
