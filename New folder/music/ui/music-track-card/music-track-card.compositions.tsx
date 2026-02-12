import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMusicTracks } from '@cloudrabbit/music.entities.music-track';
import { MusicTrackCard } from './music-track-card.js';

const forcedImage = 'https://storage.googleapis.com/bit-generated-images/images/image_a_vibrant__modern_music_album__0_1770835136296.png';

// Helper to get consistent mock data with the required image
const getMockTrack = (index = 0) => {
  const track = mockMusicTracks()[index].toObject();
  return {
    ...track,
    thumbnailUrl: forcedImage,
  };
};

export const BasicMusicTrackCard = () => {
  const track = getMockTrack(0);

  return (
    <MockProvider>
      <div style={{ padding: '48px', display: 'flex', justifyContent: 'center' }}>
        <MusicTrackCard 
          track={track}
          onPlay={(id) => console.log('Playing track:', id)}
          onAddToPlaylist={(id) => console.log('Add to playlist:', id)}
        />
      </div>
    </MockProvider>
  );
};

export const NavigableCard = () => {
  const track = {
    ...getMockTrack(1),
    title: 'Click Me to Navigate',
    artist: 'CloudHop Beats',
  };

  return (
    <MockProvider>
      <div style={{ padding: '48px', display: 'flex', justifyContent: 'center' }}>
        <MusicTrackCard 
          track={track} 
          href="/music/studio/123"
          onPlay={(id) => console.log('Playing:', id)}
          onAddToPlaylist={(id) => console.log('Added:', id)}
        />
      </div>
    </MockProvider>
  );
};

export const DarkModeVariant = () => {
  const track = getMockTrack(2);

  return (
    <MockProvider>
      <div style={{ 
        padding: '64px', 
        backgroundColor: '#0f172a', 
        backgroundImage: 'var(--effects-gradients-nebula)',
        display: 'flex', 
        justifyContent: 'center',
        minHeight: '400px',
        alignItems: 'center'
      }}>
        <MusicTrackCard 
          track={track} 
          onPlay={(id) => console.log('Playing:', id)}
          onAddToPlaylist={(id) => console.log('Added:', id)}
        />
      </div>
    </MockProvider>
  );
};

export const GridDisplay = () => {
  const tracks = mockMusicTracks().slice(0, 4).map((t, i) => ({
    ...t.toObject(),
    thumbnailUrl: forcedImage,
    id: `track-${i}`
  }));

  return (
    <MockProvider>
      <div style={{ 
        padding: '48px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px',
        backgroundColor: 'var(--colors-surface-background)'
      }}>
        {tracks.map(track => (
          <MusicTrackCard 
            key={track.id} 
            track={track} 
            href={`/music/playlist/${track.id}`}
            onPlay={(id) => console.log('Play', id)}
          />
        ))}
      </div>
    </MockProvider>
  );
};