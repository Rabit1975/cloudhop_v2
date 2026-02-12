import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockGames } from '@cloudrabbit/gamehub.entities.game';
import { GameHubDashboardPanel } from './game-hub-dashboard-panel.js';

const sampleGames = mockGames([
  {
    name: "Nebula Racers",
    gameType: "html5",
    tags: ["Racing", "Sci-Fi"],
    imageUrls: ["https://storage.googleapis.com/bit-generated-images/images/image_a_stunning__futuristic_game_da_0_1770835130519.png"]
  },
  {
    name: "Cosmic Quest",
    gameType: "unity",
    tags: ["Adventure", "RPG"],
    imageUrls: ["https://storage.googleapis.com/bit-generated-images/images/image_a_stunning__futuristic_game_da_0_1770835130519.png"]
  },
  {
    name: "Starfighter Arena",
    gameType: "external_stream",
    tags: ["Action", "Multiplayer"],
    imageUrls: ["https://storage.googleapis.com/bit-generated-images/images/image_a_stunning__futuristic_game_da_0_1770835130519.png"]
  }
]);

export const DefaultDashboardPanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ maxWidth: 900, padding: 24, backgroundColor: 'var(--colors-surface-background)' }}>
          <div style={{ height: 500 }}>
            <GameHubDashboardPanel mockGames={sampleGames} />
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const DarkModePanel = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ maxWidth: 900, padding: 24, backgroundColor: 'var(--colors-surface-background)', minHeight: 550 }}>
          <div style={{ height: 500 }}>
            <GameHubDashboardPanel mockGames={sampleGames} />
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ maxWidth: 600, padding: 24 }}>
          <div style={{ height: 300 }}>
            <GameHubDashboardPanel mockGames={[]} />
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};