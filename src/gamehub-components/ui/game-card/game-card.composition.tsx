import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockGames } from '@cloudrabbit/gamehub.entities.game';
import { GameCard } from './game-card.js';

const [sampleGame, unityGame, streamGame] = mockGames([
  {
    name: "Cyber Racer X",
    tags: ["Racing", "Cyberpunk"],
    imageUrls: ["https://storage.googleapis.com/bit-generated-images/images/image_high_resolution_game_thumbnail_0_1770833871150.png"]
  },
  {
    name: "Nebula Quest",
    gameType: "unity",
    tags: ["RPG", "Adventure"],
    imageUrls: ["https://storage.googleapis.com/bit-generated-images/images/image_high_resolution_game_thumbnail_0_1770833871150.png"]
  },
  {
    name: "Pro Tournament Live",
    gameType: "external_stream",
    tags: ["Esports", "FPS"],
    imageUrls: ["https://storage.googleapis.com/bit-generated-images/images/image_high_resolution_game_thumbnail_0_1770833871150.png"]
  }
]);

export const BasicGameCard = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: 300, padding: 20 }}>
        <GameCard game={sampleGame} />
      </div>
    </MockProvider>
  );
};

export const WithRatingAndFooter = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: 300, padding: 20 }}>
        <GameCard 
          game={unityGame} 
          rating={4.8}
          footer={
            <div style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>
              Played by 12k users
            </div>
          }
        />
      </div>
    </MockProvider>
  );
};

export const GridDisplay = () => {
  return (
    <MockProvider>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px', 
        padding: '24px',
        backgroundColor: 'var(--colors-surface-background)'
      }}>
        <GameCard game={sampleGame} rating={4.2} />
        <GameCard game={unityGame} rating={4.9} />
        <GameCard game={streamGame} rating={3.5} />
      </div>
    </MockProvider>
  );
};

export const WithCustomHeader = () => {
  return (
    <MockProvider>
      <div style={{ maxWidth: 300, padding: 20 }}>
        <GameCard 
          game={streamGame} 
          header={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%' 
            }}>
              <span style={{ 
                color: 'var(--colors-status-negative-default)', 
                fontSize: '10px', 
                fontWeight: 'bold', 
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                LIVE
              </span>
              <span style={{ fontSize: '10px', color: 'var(--colors-text-secondary)' }}>
                Twitch
              </span>
            </div>
          }
        />
      </div>
    </MockProvider>
  );
};