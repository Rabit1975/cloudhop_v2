import React, { useState } from 'react'

const MusicLayout: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Lofi Hip Hop Radio',
    artist: 'ChilledCow',
    duration: '∞ Live'
  })

  const tracks = [
    { id: 1, title: 'Chill Vibes', artist: 'Lofi Girl', duration: '2:45' },
    { id: 2, title: 'Study Focus', artist: 'Chillhop Music', duration: '3:20' },
    { id: 3, title: 'Jazz Lofi', artist: 'Jazz Vibes', duration: '4:15' },
    { id: 4, title: 'Ambient Space', artist: 'Space Waves', duration: '5:30' },
    { id: 5, title: 'Synthwave Drive', artist: 'Retro Future', duration: '3:50' }
  ]

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center space-x-3">
          <span>🎵</span>
          <span>Music Studio</span>
        </h1>
        <p className="text-gray-400">YouTube Music integration & streaming</p>
      </div>

      <div className="text-center py-8">
        <span className="text-6xl mb-4">🎵</span>
        <h2 className="text-2xl font-bold mb-2">YouTube Music</h2>
        <p className="text-gray-400">Integrated YouTube music streaming coming soon!</p>
      </div>
    </div>
  )
}

export default MusicLayout
