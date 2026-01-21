export interface MusicTransport {
  load(url: string): Promise<void>
  play(): Promise<void>
  pause(): Promise<void>
  stop(): Promise<void>
  seek(seconds: number): Promise<void>
  setVolume(volume: number): Promise<void> // 0-1 normalized
  getCurrentTime(): Promise<number>
  getDuration(): Promise<number>
  destroy(): Promise<void>
}
