import { MusicTransport } from './MusicTransport'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export class YouTubeTransport implements MusicTransport {
  private player: any = null
  private elementId: string
  private apiReadyTimeout = 10000 // 10 seconds
  private videoId: string | null = null

  constructor(elementId = 'youtube-player') {
    this.elementId = elementId
  }

  private async ensureYouTubeAPI(): Promise<void> {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      return
    }

    // Check if script is already loading
    const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }

    // Wait for API to be ready
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('YouTube API load timeout'))
      }, this.apiReadyTimeout)

      const checkReady = () => {
        if (window.YT && window.YT.Player) {
          clearTimeout(timeout)
          resolve()
        } else {
          setTimeout(checkReady, 100)
        }
      }

      // Store original handler if it exists
      const originalHandler = window.onYouTubeIframeAPIReady
      
      window.onYouTubeIframeAPIReady = () => {
        if (originalHandler) {
          originalHandler()
        }
        clearTimeout(timeout)
        resolve()
      }

      checkReady()
    })
  }

  private parseYouTubeUrl(url: string): string | null {
    // Parse various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }

    return null
  }

  private ensurePlayerElement(): void {
    if (!document.getElementById(this.elementId)) {
      const div = document.createElement('div')
      div.id = this.elementId
      div.style.display = 'none'
      div.setAttribute('aria-hidden', 'true')
      document.body.appendChild(div)
    }
  }

  async load(url: string): Promise<void> {
    const videoId = this.parseYouTubeUrl(url)
    if (!videoId) {
      throw new Error('Invalid YouTube URL or video ID')
    }

    this.videoId = videoId
    await this.ensureYouTubeAPI()
    this.ensurePlayerElement()

    return new Promise((resolve, reject) => {
      try {
        if (this.player) {
          this.player.loadVideoById(videoId)
          resolve()
        } else {
          this.player = new window.YT.Player(this.elementId, {
            height: '1',
            width: '1',
            videoId: videoId,
            events: {
              onReady: () => resolve(),
              onError: (e: any) => reject(new Error(`YouTube player error: ${e.data}`))
            }
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  async play(): Promise<void> {
    if (!this.player) {
      throw new Error('YouTube player not initialized')
    }
    this.player.playVideo()
  }

  async pause(): Promise<void> {
    if (!this.player) {
      throw new Error('YouTube player not initialized')
    }
    this.player.pauseVideo()
  }

  async stop(): Promise<void> {
    if (!this.player) {
      throw new Error('YouTube player not initialized')
    }
    this.player.stopVideo()
  }

  async seek(seconds: number): Promise<void> {
    if (!this.player) {
      throw new Error('YouTube player not initialized')
    }
    this.player.seekTo(seconds, true)
  }

  async setVolume(volume: number): Promise<void> {
    if (!this.player) {
      throw new Error('YouTube player not initialized')
    }
    // YouTube expects 0-100, we normalize from 0-1
    const ytVolume = Math.max(0, Math.min(100, volume * 100))
    this.player.setVolume(ytVolume)
  }

  async getCurrentTime(): Promise<number> {
    if (!this.player) {
      return 0
    }
    return this.player.getCurrentTime() || 0
  }

  async getDuration(): Promise<number> {
    if (!this.player) {
      return 0
    }
    return this.player.getDuration() || 0
  }

  async destroy(): Promise<void> {
    if (this.player) {
      this.player.destroy()
      this.player = null
    }
    
    const element = document.getElementById(this.elementId)
    if (element) {
      element.remove()
    }
  }
}
