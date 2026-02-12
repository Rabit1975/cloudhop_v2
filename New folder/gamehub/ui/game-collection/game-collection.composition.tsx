import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockGames } from '@cloudrabbit/gamehub.entities.game';
import { GameCollection } from './game-collection.js';

const games = mockGames([
  {
    name: "Cyber Racer X",
    tags: ["Racing", "Cyberpunk"],
    imageUrls: ["https://storage.googleapis.com/bit-generated-images/images/image_high_resolution_concept_art_or_0_1770835130926.png"]
  },
  {
    name: "Nebula Quest",
    gameType: "unity",
    tags: ["RPG", "Adventure"],
    imageUrls: ["https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gb78d2e703c490c862065eee39f14fcfab6495fdfa576a071aaafa3d1f349f73aabcac25aecdfd67b981737191da8268a69788965c48dcb44ab27f850ff2c8754_1280.jpg"]
  },
  {
    name: "Pro Tournament Live",
    gameType: "external_stream",
    tags: ["Esports", "FPS"],
    imageUrls: ["https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g2fc68bb755af53887016f6e82dc49a6564ffd4d075071fd67d42c670068d53ccb6e51d924d7a1a0b390c7fe8d0faf79bb5eecb154d58bf3f8e651c60ecb0b6f9_1280.jpg"]
  },
  {
    name: "Space Odyssey",
    gameType: "html5",
    tags: ["Strategy", "Space"],
    imageUrls: ["https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gd0925b0afc373440a10b67c6ebea46985d70f798682a9c81f4b2e59e3b11f3fc2c4ecb3f03276690f55171ce14970363a1a370b1550c40b14f96bcfe0f5f9c43_1280.png"]
  }
]);

export const BasicGameCollection = () => {
  return (
    <MockProvider>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <GameCollection games={games} />
      </div>
    </MockProvider>
  );
};

export const WithTitle = () => {
  return (
    <MockProvider>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <GameCollection 
          title="Recently Played" 
          games={games.slice(0, 3)} 
        />
      </div>
    </MockProvider>
  );
};

export const EmptyCollection = () => {
  return (
    <MockProvider>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <p style={{ color: 'var(--colors-text-secondary)' }}>Below should be empty:</p>
        <GameCollection games={[]} />
      </div>
    </MockProvider>
  );
};