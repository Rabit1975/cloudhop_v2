import { InfluenceProfile } from './InfluenceProfiles'

export type InfluenceCallback = (profile: InfluenceProfile) => void

export class InfluenceScheduler {
  private callback: InfluenceCallback | null = null
  private intervalId: any = null
  private lastProfile: InfluenceProfile | null = null
  private updateInterval = 5000 // 5 seconds

  constructor(updateInterval = 5000) {
    this.updateInterval = updateInterval
  }

  start(callback: InfluenceCallback, initialProfile: InfluenceProfile): void {
    this.callback = callback
    this.lastProfile = initialProfile
    
    // Apply immediately
    this.applyInfluence(initialProfile)
    
    // Schedule periodic updates
    this.intervalId = setInterval(() => {
      if (this.lastProfile) {
        this.applyInfluence(this.lastProfile)
      }
    }, this.updateInterval)
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.callback = null
    this.lastProfile = null
  }

  updateProfile(profile: InfluenceProfile): void {
    this.lastProfile = profile
    this.applyInfluence(profile)
  }

  private applyInfluence(profile: InfluenceProfile): void {
    if (this.callback) {
      try {
        this.callback(profile)
      } catch (error) {
        console.error('Error applying music influence:', error)
      }
    }
  }

  isRunning(): boolean {
    return this.intervalId !== null
  }
}
