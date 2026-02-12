import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { MusicPlaylist } from '@cloudrabbit/music.entities.music-playlist';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MusicPlaylistSearchResult } from './music-playlist-search-result.js';

const createMockPlaylistResult = (
  id: string,
  name: string,
  description: string,
  trackCount: number
): SearchResult => {
  const tracks: any[] = Array(trackCount).fill({});
  
  const playlist = new MusicPlaylist(
    id,
    name,
    'owner-1',
    true,
    tracks,
    new Date().toISOString(),
    description
  );

  return new SearchResult(`result-${id}`, playlist as any, 1);
};

export const BasicPlaylistResult = () => {
  const result = createMockPlaylistResult(
    '1',
    'Lo-Fi Study Beats',
    'Relaxing beats to help you focus and code. Updated weekly with fresh vibes.',
    12
  );

  return (
    <MockProvider>
      <div style={{ padding: '24px', maxWidth: '360px' }}>
        <MusicPlaylistSearchResult result={result} />
      </div>
    </MockProvider>
  );
};

export const DarkModeGrid = () => {
  const results = [
    createMockPlaylistResult('1', 'Synthwave Night', 'Retro futuristic sounds for night drives.', 24),
    createMockPlaylistResult('2', 'Ambient Space', 'Deep relaxation in the nebula.', 8),
    createMockPlaylistResult('3', 'Gaming Intensity', 'High BPM tracks for competitive play.', 45),
  ];

  return (
    <CloudrabbitTheme initialTheme="dark">
      <MockProvider noTheme>
        <div style={{ 
          padding: '32px', 
          backgroundColor: 'var(--colors-surface-background)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          minHeight: '400px'
        }}>
          {results.map((result) => (
            <MusicPlaylistSearchResult key={result.id} result={result} />
          ))}
        </div>
      </MockProvider>
    </CloudrabbitTheme>
  );
};

export const WithoutDescription = () => {
  const result = createMockPlaylistResult(
    '4',
    'My Daily Mix',
    '',
    50
  );

  return (
    <MockProvider>
      <div style={{ padding: '24px', maxWidth: '360px' }}>
        <MusicPlaylistSearchResult result={result} />
      </div>
    </MockProvider>
  );
};