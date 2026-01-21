import React, { useEffect, useState } from 'react'
import YouTubeMusicPlayer from './YouTubeMusicPlayer'

interface SpaceMusicIntegrationProps {
  spaceType: string
  mood?: string
  galaxyCycle?: 'day' | 'dusk' | 'night' | 'dawn'
  autoPlay?: boolean
}

// Space-specific playlist IDs (YouTube Music playlists)
const SPACE_PLAYLISTS = {
  observatory: 'PLxxxxxx', // Synthwave ambient
  lounge: 'PLyyyyyy', // Lo-fi/chillhop
  studio: null, // User-controlled
  anima: 'PLzzzzzz', // AI-generated mood playlists
  music: 'PLaaaaaa', // Music space playlists
  world: 'PLbbbbbb' // World exploration ambient
}

const MOOD_PLAYLISTS = {
  calm: 'PLcccccc',
  energetic: 'PLdddddd',
  focus: 'PLeeeeee',
  creative: 'PLffffff'
}

export default function SpaceMusicIntegration({
  spaceType,
  mood,
  galaxyCycle = 'day',
  autoPlay = true
}: SpaceMusicIntegrationProps) {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [volume, setVolume] = useState(30)

  useEffect(() => {
    // Determine playlist based on space type and mood
    let selectedPlaylist = SPACE_PLAYLISTS[spaceType as keyof typeof SPACE_PLAYLISTS]
    
    // If mood is specified, use mood playlist
    if (mood && MOOD_PLAYLISTS[mood as keyof typeof MOOD_PLAYLISTS]) {
      selectedPlaylist = MOOD_PLAYLISTS[mood as keyof typeof MOOD_PLAYLISTS]
    }

    setPlaylistId(selectedPlaylist || null)

    // Adjust volume based on galaxy cycle
    switch (galaxyCycle) {
      case 'dusk':
      case 'night':
        setVolume(20) // Softer at night
        break
      case 'dawn':
        setVolume(25)
        break
      case 'day':
        setVolume(30)
        break
    }
  }, [spaceType, mood, galaxyCycle])

  // Don't render if no playlist or studio mode
  if (!playlistId || spaceType === 'studio') {
    return null
  }

  return (
    <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
      <YouTubeMusicPlayer
        playlistId={playlistId}
        autoPlay={autoPlay}
        volume={volume}
        onReady={() => console.log(`Ambient music loaded for ${spaceType}`)}
      />
    </div>
  )
}
