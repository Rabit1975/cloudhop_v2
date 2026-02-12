import React, { useState, useEffect } from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockGames } from '@cloudrabbit/gamehub.entities.game';
import { GameList } from './game-list.js';

const IMAGE_URL = "https://storage.googleapis.com/bit-generated-images/images/image_a_sleek__futuristic_digital_in_0_1770835146828.png";

export const BasicGameList = () => {
  const games = mockGames([
    {
      name: "Cyber Racer X",
      tags: ["Racing", "Cyberpunk"],
      imageUrls: [IMAGE_URL]
    },
    {
      name: "Nebula Quest",
      gameType: "unity",
      tags: ["RPG", "Adventure"],
      imageUrls: [IMAGE_URL]
    },
    {
      name: "Pro Tournament Live",
      gameType: "external_stream",
      tags: ["Esports", "FPS"],
      imageUrls: [IMAGE_URL]
    },
    {
      name: "Cosmic Puzzle",
      gameType: "html5",
      tags: ["Puzzle", "Casual"],
      imageUrls: [IMAGE_URL]
    },
    {
      name: "Star Fighter Arena",
      gameType: "unity",
      tags: ["Action", "Multiplayer"],
      imageUrls: [IMAGE_URL]
    }
  ]);

  return (
    <MockProvider>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--colors-text-primary)' }}>Featured Games</h2>
        <GameList games={games} />
      </div>
    </MockProvider>
  );
};

export const LoadingState = () => {
  return (
    <MockProvider>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--colors-text-primary)' }}>Loading Games...</h2>
        <GameList loading loadingItemCount={4} />
      </div>
    </MockProvider>
  );
};

export const EmptyState = () => {
  return (
    <MockProvider>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--colors-text-primary)' }}>Search Results</h2>
        <GameList games={[]} />
      </div>
    </MockProvider>
  );
};

export const SimulatingFetch = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState(mockGames([]));

  useEffect(() => {
    const timer = setTimeout(() => {
      setGames(mockGames([
        { name: "Fetched Game 1", imageUrls: [IMAGE_URL] },
        { name: "Fetched Game 2", imageUrls: [IMAGE_URL] }
      ]));
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MockProvider>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: 'var(--colors-text-primary)' }}>Dynamic List</h2>
          <button 
            onClick={() => { 
              setLoading(true); 
              setGames([]); 
              setTimeout(() => { 
                setGames(mockGames([
                  { name: "Refreshed Game", imageUrls: [IMAGE_URL] }
                ])); 
                setLoading(false); 
              }, 1500); 
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: 'var(--colors-primary-default)',
              color: 'var(--colors-primary-contrast)',
              border: 'none',
              borderRadius: 'var(--borders-radius-small)'
            }}
          >
            Refresh
          </button>
        </div>
        <GameList games={games} loading={loading} />
      </div>
    </MockProvider>
  );
};