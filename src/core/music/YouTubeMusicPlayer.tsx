import React, { useEffect, useRef, useState } from 'react'

interface YouTubeMusicPlayerProps {
  videoId?: string
  playlistId?: string
  autoPlay?: boolean
  volume?: number
  onPlay?: () => void
  onPause?: () => void
  onEnd?: () => void
  onTimeUpdate?: (time: number) => void
  onReady?: () => void
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function YouTubeMusicPlayer({
  videoId,
  playlistId,
  autoPlay = false,
  volume = 50,
  onPlay,
  onPause,
  onEnd,
  onTimeUpdate,
  onReady
}: YouTubeMusicPlayerProps) {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer()
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      initPlayer()
    }
  }, [])

  const initPlayer = () => {
    if (!containerRef.current) return

    playerRef.current = new window.YT.Player(containerRef.current, {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: autoPlay ? 1 : 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: (event: any) => {
          setIsReady(true)
          if (volume !== undefined) {
            event.target.setVolume(volume)
          }
          if (playlistId) {
            event.target.loadPlaylist({ list: playlistId })
          }
          onReady?.()
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            onPlay?.()
            startTimeTracking()
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            onPause?.()
          } else if (event.data === window.YT.PlayerState.ENDED) {
            onEnd?.()
          }
        }
      }
    })
  }

  const startTimeTracking = () => {
    const interval = setInterval(() => {
      if (playerRef.current && isReady) {
        const currentTime = playerRef.current.getCurrentTime()
        onTimeUpdate?.(currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }

  // Exposed controls via ref
  useEffect(() => {
    if (!isReady || !playerRef.current) return

    // Attach controls to window for external access
    ;(window as any).musicPlayer = {
      play: () => playerRef.current?.playVideo(),
      pause: () => playerRef.current?.pauseVideo(),
      stop: () => playerRef.current?.stopVideo(),
      seek: (seconds: number) => playerRef.current?.seekTo(seconds, true),
      setVolume: (vol: number) => playerRef.current?.setVolume(vol),
      loadTrack: (id: string) => playerRef.current?.loadVideoById(id),
      loadPlaylist: (id: string) => playerRef.current?.loadPlaylist({ list: id }),
      getCurrentTime: () => playerRef.current?.getCurrentTime() || 0,
      getDuration: () => playerRef.current?.getDuration() || 0,
      nextTrack: () => playerRef.current?.nextVideo(),
      previousTrack: () => playerRef.current?.previousVideo()
    }
  }, [isReady])

  // Update video when videoId changes
  useEffect(() => {
    if (isReady && videoId && playerRef.current) {
      playerRef.current.loadVideoById(videoId)
    }
  }, [videoId, isReady])

  // Update playlist when playlistId changes
  useEffect(() => {
    if (isReady && playlistId && playerRef.current) {
      playerRef.current.loadPlaylist({ list: playlistId })
    }
  }, [playlistId, isReady])

  return (
    <div style={{ position: 'absolute', left: '-9999px' }}>
      <div ref={containerRef} />
    </div>
  )
}
