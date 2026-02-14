import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { GameSearchResultRenderer } from './game-search-result-renderer.js';
import type { GameSearchResult } from './game-search-result-type.js';

const mockGameResult: GameSearchResult = {
  id: 'game-1',
  relevanceScore: 0.95,
  content: {
    title: 'Cyber Odyssey',
    description: 'Dive into the neon-soaked streets of the digital frontier. Explore a vast open world filled with cybernetic enhancements, rogue AI, and high-stakes corporate espionage. Experience the future of gaming with immersive ray-traced graphics and haptic feedback integration.',
    thumbnail: 'https://storage.googleapis.com/bit-generated-images/images/image_modern_video_game_thumbnail__d_0_1770834022251.png',
    platform: 'Unity',
    url: '/gamehub/cyber-odyssey',
  },
};

const mockHtml5Game: GameSearchResult = {
  id: 'game-2',
  relevanceScore: 0.88,
  content: {
    title: 'Retro Racer',
    description: 'A nostalgic 8-bit racing game with modern physics.',
    thumbnail: 'https://storage.googleapis.com/bit-generated-images/images/image_modern_video_game_thumbnail__d_0_1770834022251.png',
    platform: 'HTML5',
    url: '/gamehub/retro-racer',
  },
};

const mockStreamGame: GameSearchResult = {
  id: 'game-3',
  relevanceScore: 0.75,
  content: {
    title: 'Galactic Strategy Live',
    description: 'Watch the top players compete in real-time strategy battles across the galaxy. Live streams integrated directly from Twitch.',
    thumbnail: 'https://storage.googleapis.com/bit-generated-images/images/image_modern_video_game_thumbnail__d_0_1770834022251.png',
    platform: 'Twitch',
    url: '/gamehub/galactic-strategy',
  },
};

export const BasicGameResult = () => {
  return (
    <MockProvider>
      <div style={{ padding: '32px', maxWidth: '360px' }}>
        <GameSearchResultRenderer result={mockGameResult} />
      </div>
    </MockProvider>
  );
};

export const ResultsGrid = () => {
  return (
    <MockProvider>
      <div style={{ 
        padding: '32px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px',
        backgroundColor: 'var(--colors-surface-background)'
      }}>
        <GameSearchResultRenderer result={mockGameResult} />
        <GameSearchResultRenderer result={mockHtml5Game} />
        <GameSearchResultRenderer result={mockStreamGame} />
      </div>
    </MockProvider>
  );
};

export const WithoutPlatform = () => {
  const noPlatformResult: GameSearchResult = {
    ...mockGameResult,
    content: {
      ...mockGameResult.content,
      platform: undefined,
    },
  };

  return (
    <MockProvider>
      <div style={{ padding: '32px', maxWidth: '360px' }}>
        <GameSearchResultRenderer result={noPlatformResult} />
      </div>
    </MockProvider>
  );
};