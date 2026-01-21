// AudioAnalyzer - WebAudio analysis for music visualization

export interface AudioFeatures {
  bass: number
  mid: number
  high: number
  energy: number
  bpm: number
}

export class AudioAnalyzer {
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private dataArray: Uint8Array | null = null
  private source: MediaElementAudioSourceNode | null = null
  private animationFrame: number | null = null
  private onUpdate: ((features: AudioFeatures) => void) | null = null
  
  // BPM detection state
  private peakHistory: number[] = []
  private lastPeakTime = 0
  private detectedBpm = 120

  attach(audioElement: HTMLAudioElement): void {
    if (this.audioContext) {
      this.detach()
    }

    try {
      this.audioContext = new AudioContext()
      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = 2048
      this.analyser.smoothingTimeConstant = 0.8

      this.source = this.audioContext.createMediaElementSource(audioElement)
      this.source.connect(this.analyser)
      this.analyser.connect(this.audioContext.destination)

      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    } catch (error) {
      console.error('Failed to attach audio analyzer:', error)
    }
  }

  detach(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }

    if (this.source) {
      this.source.disconnect()
      this.source = null
    }

    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }

    this.analyser = null
    this.dataArray = null
  }

  start(callback: (features: AudioFeatures) => void): void {
    this.onUpdate = callback
    this.analyze()
  }

  stop(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
    this.onUpdate = null
  }

  private analyze(): void {
    if (!this.analyser || !this.dataArray || !this.onUpdate) return

    this.analyser.getByteFrequencyData(this.dataArray)

    const features = this.extractFeatures(this.dataArray)
    this.onUpdate(features)

    this.animationFrame = requestAnimationFrame(() => this.analyze())
  }

  private extractFeatures(data: Uint8Array): AudioFeatures {
    const bufferLength = data.length
    
    // Frequency ranges (approximate)
    const bassRange = Math.floor(bufferLength * 0.1) // 0-10%
    const midRange = Math.floor(bufferLength * 0.4) // 10-50%
    const highRange = bufferLength // 50-100%

    let bassSum = 0
    let midSum = 0
    let highSum = 0

    // Calculate bass (0-250 Hz)
    for (let i = 0; i < bassRange; i++) {
      bassSum += data[i]
    }

    // Calculate mid (250-2000 Hz)
    for (let i = bassRange; i < midRange; i++) {
      midSum += data[i]
    }

    // Calculate high (2000+ Hz)
    for (let i = midRange; i < highRange; i++) {
      highSum += data[i]
    }

    const bass = bassSum / (bassRange * 255)
    const mid = midSum / ((midRange - bassRange) * 255)
    const high = highSum / ((highRange - midRange) * 255)

    // Calculate overall energy
    let energySum = 0
    for (let i = 0; i < bufferLength; i++) {
      energySum += data[i]
    }
    const energy = energySum / (bufferLength * 255)

    // Simple BPM detection based on bass peaks
    this.detectBpm(bass)

    return {
      bass,
      mid,
      high,
      energy,
      bpm: this.detectedBpm
    }
  }

  private detectBpm(bass: number): void {
    const now = performance.now()
    const threshold = 0.5

    // Detect peak
    if (bass > threshold) {
      const timeSinceLastPeak = now - this.lastPeakTime
      
      if (timeSinceLastPeak > 200) { // Ignore peaks closer than 200ms (300 BPM max)
        this.peakHistory.push(timeSinceLastPeak)
        
        // Keep last 8 peaks
        if (this.peakHistory.length > 8) {
          this.peakHistory.shift()
        }

        // Calculate average interval
        if (this.peakHistory.length >= 4) {
          const avgInterval = this.peakHistory.reduce((a, b) => a + b, 0) / this.peakHistory.length
          const calculatedBpm = 60000 / avgInterval
          
          // Smooth BPM changes and clamp to reasonable range
          if (calculatedBpm >= 60 && calculatedBpm <= 200) {
            this.detectedBpm = this.detectedBpm * 0.9 + calculatedBpm * 0.1
          }
        }

        this.lastPeakTime = now
      }
    }
  }

  isActive(): boolean {
    return this.audioContext !== null && this.audioContext.state === 'running'
  }
}

// Singleton instance
export const audioAnalyzer = new AudioAnalyzer()
