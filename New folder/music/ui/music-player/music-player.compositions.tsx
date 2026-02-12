import React, { useState, useEffect } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { MusicPlayer } from './music-player.js';

const mockTrack = MusicTrack.from({
  id: '1',
  title: 'Neon Nebula',
  artist: 'Cyber Synth',
  duration: 185,
  sourceType: 'upload',
  sourceIdentifier: 'file-123',
  isPublic: true,
  createdAt: new Date().toISOString(),
  thumbnailUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_modern_and_minimalist_music__0_1770835129831.png'
});

const youtubeTrack = MusicTrack.from({
  id: '2',
  title: 'Lo-Fi Coding Beats',
  artist: 'ChillHop Stream',
  duration: 600,
  sourceType: 'youtube',
  sourceIdentifier: 'yt-123',
  isPublic: true,
  createdAt: new Date().toISOString(),
  thumbnailUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_modern_and_minimalist_music__0_1770835129831.png'
});

export const DefaultPlayer = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <MusicPlayer track={mockTrack} />
      </div>
    </CloudrabbitTheme>
  );
};

export const PlayingState = () => {
  const [currentTime, setCurrentTime] = useState(45);
  const [isPlaying, setIsPlaying] = useState(true);

  // Simple simulation of playback
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentTime < mockTrack.duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev >= mockTrack.duration ? 0 : prev + 1));
      }, 1000);
    } else if (!isPlaying) {
      clearInterval(interval!); // Clear interval if not playing
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, mockTrack.duration]);

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <MusicPlayer 
          track={mockTrack} 
          isPlaying={isPlaying}
          currentTime={currentTime}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onSeek={(time) => setCurrentTime(time)}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const YouTubeSource = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ padding: '32px', background: 'var(--colors-surface-background)' }}>
        <MusicPlayer 
          track={youtubeTrack} 
          currentTime={120}
          volume={80}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const EmptyPlayer = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px' }}>
        <MusicPlayer 
          track={null} 
          currentTime={0}
          volume={50}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const MobileLayoutSimulation = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '16px', 
        width: '375px', 
        border: '1px solid var(--colors-border-default)',
        background: 'var(--colors-surface-background)',
        position: 'relative',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        <div style={{ padding: '16px' }}>Content goes here...</div>
        <MusicPlayer track={mockTrack} isPlaying={true} />
      </div>
    </CloudrabbitTheme>
  );
};