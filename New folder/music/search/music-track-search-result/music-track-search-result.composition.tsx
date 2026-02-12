import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { MusicTrackSearchResult } from './music-track-search-result.js';

// Mock data using the required image URL
const mockThumbnail = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_music_visuali_0_1770834026837.png";

// Mock implementation of SearchResult structure for preview purposes
const mockTrackContent = {
  id: 'track-1',
  title: 'Neon Nebula',
  artist: 'Cosmic Beats',
  thumbnailUrl: mockThumbnail,
  sourceType: 'upload',
  duration: 245, // 4:05
};

const mockResult = {
  id: 'result-1',
  content: mockTrackContent,
  relevanceScore: 0.95,
} as unknown as SearchResult;

const youtubeResult = {
  id: 'result-2',
  content: {
    id: 'track-2',
    title: 'Lo-Fi Coding Beats',
    artist: 'ChillHop Music',
    thumbnailUrl: mockThumbnail,
    sourceType: 'youtube',
    duration: 3600, // 60:00
  },
  relevanceScore: 0.88,
} as unknown as SearchResult;

export const BasicSearchResult = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '360px' }}>
          <MusicTrackSearchResult result={mockResult} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const YoutubeSearchResult = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '360px' }}>
          <MusicTrackSearchResult result={youtubeResult} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const GridLayoutExample = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '48px', 
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <h3 style={{ 
            color: 'var(--colors-text-primary)', 
            margin: 0,
            fontFamily: 'var(--typography-font-family)'
          }}>
            Search Results: "Nebula"
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            <MusicTrackSearchResult result={mockResult} />
            <MusicTrackSearchResult result={youtubeResult} />
            <MusicTrackSearchResult 
              result={{
                ...mockResult,
                content: {
                  ...mockTrackContent,
                  id: 'track-3',
                  title: 'Starlight Symphony',
                  sourceType: 'external',
                  duration: 185
                }
              } as unknown as SearchResult} 
            />
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};