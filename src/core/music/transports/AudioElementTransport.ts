import { MusicTransport } from './MusicTransport'

export class AudioElementTransport implements MusicTransport {
  private audio: HTMLAudioElement
  private loadTimeout = 10000 // 10 seconds

  constructor() {
    this.audio = new Audio()
  }

  async load(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Audio load timeout'))
      }, this.loadTimeout)

      const onLoad = () => {
        clearTimeout(timeout)
        this.audio.removeEventListener('loadedmetadata', onLoad)
        this.audio.removeEventListener('canplaythrough', onLoad)
        this.audio.removeEventListener('error', onError)
        resolve()
      }

      const onError = (e: Event) => {
        clearTimeout(timeout)
        this.audio.removeEventListener('loadedmetadata', onLoad)
        this.audio.removeEventListener('canplaythrough', onLoad)
        this.audio.removeEventListener('error', onError)
        reject(new Error('Audio load error'))
      }

      this.audio.addEventListener('loadedmetadata', onLoad)
      this.audio.addEventListener('canplaythrough', onLoad)
      this.audio.addEventListener('error', onError)
      
      this.audio.src = url
      this.audio.load()
    })
  }

  async play(): Promise<void> {
    return this.audio.play()
  }

  async pause(): Promise<void> {
    this.audio.pause()
  }

  async stop(): Promise<void> {
    this.audio.pause()
    this.audio.currentTime = 0
  }

  async seek(seconds: number): Promise<void> {
    this.audio.currentTime = seconds
  }

  async setVolume(volume: number): Promise<void> {
    // Normalize to 0-1 range
    this.audio.volume = Math.max(0, Math.min(1, volume))
  }

  async getCurrentTime(): Promise<number> {
    return this.audio.currentTime
  }

  async getDuration(): Promise<number> {
    return this.audio.duration || 0
  }

  async destroy(): Promise<void> {
    this.audio.pause()
    this.audio.src = ''
    this.audio.load()
  }
}
