import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MemoryRouter } from 'react-router-dom';
import { MusicPlaylist } from '@cloudrabbit/music.entities.music-playlist';
import { MusicTrack, MusicTrackSourceType } from '@cloudrabbit/music.entities.music-track';
import { MusicPlaylistCard } from './music-playlist-card.js';

// Manual mock implementation to avoid complex factory dependencies in preview
const mockTrackData = {
  id: 't1',
  title: 'Starlight',
  duration: 180,
  sourceType: 'upload' as MusicTrackSourceType,
  sourceIdentifier: 'file-1',
  isPublic: true,
  createdAt: new Date().toISOString(),
  thumbnailUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_music_playlis_0_1770835233075.png'
};

const mockTrack: MusicTrack = new MusicTrack(
  mockTrackData.id,
  mockTrackData.title,
  mockTrackData.duration,
  mockTrackData.sourceType,
  mockTrackData.sourceIdentifier,
  mockTrackData.isPublic,
  mockTrackData.createdAt,
  mockTrackData.thumbnailUrl
);

const mockPlaylist: MusicPlaylist = new MusicPlaylist( // Use constructor as per API
  'playlist-1',
  'Nebula Vibes',
  'user-1',
  true,
  [mockTrack],
  new Date().toISOString(),
  'Chill beats for coding and space travel.'
);

const privatePlaylist: MusicPlaylist = new MusicPlaylist( // Use constructor as per API
  'playlist-2',
  'Private Collection',
  'user-1',
  false,
  [],
  new Date().toISOString(),
  'Top secret tracks.'
);

export const BasicPlaylistCard = () => {
  return (
    <MockProvider>
      <MemoryRouter>
        <div style={{ padding: 32, maxWidth: 300 }}>
          <MusicPlaylistCard 
            playlist={mockPlaylist} 
            onPlay={(id) => alert(`Playing playlist: ${id}`)} 
          />
        </div>
      </MemoryRouter>
    </MockProvider>
  );
};

export const PrivatePlaylistCard = () => {
  return (
    <MockProvider>
      <MemoryRouter>
        <div style={{ padding: 32, maxWidth: 300 }}>
          <MusicPlaylistCard 
            playlist={privatePlaylist} 
            onPlay={(id) => alert(`Playing playlist: ${id}`)} 
          />
        </div>
      </MemoryRouter>
    </MockProvider>
  );
};

export const PlaylistGrid = () => {
  return (
    <MockProvider>
      <MemoryRouter>
        <div style={{ 
          padding: 32, 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
          gap: 24,
          backgroundColor: 'var(--colors-surface-background)'
        }}>
          <MusicPlaylistCard playlist={mockPlaylist} />
          <MusicPlaylistCard playlist={privatePlaylist} />
          <MusicPlaylistCard 
            playlist={new MusicPlaylist(
              'playlist-3',
              'Gym Motivation',
              'user-1',
              true,
              [mockTrack],
              new Date().toISOString()
            )} 
          />
          <MusicPlaylistCard 
            playlist={new MusicPlaylist(
              'playlist-4',
              'Sleep & Relax',
              'user-1',
              true,
              Array(50).fill(mockTrack),
              new Date().toISOString()
            )} 
          />
        </div>
      </MemoryRouter>
    </MockProvider>
  );
};