import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { GameActivity } from '@cloudrabbit/gamehub.entities.game-activity';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { GameActivityFeed } from './game-activity-feed.js';

// Mock Games
const mockGames = [
  Game.from({
    id: 'game-1',
    name: 'Nebula Racers',
    description: 'High speed racing',
    categoryId: 'cat-1',
    gameType: 'unity',
    imageUrls: [],
    createdAt: new Date().toISOString(),
  }),
  Game.from({
    id: 'game-2',
    name: 'Cosmic Chess',
    description: 'Strategy game',
    categoryId: 'cat-2',
    gameType: 'html5',
    imageUrls: [],
    createdAt: new Date().toISOString(),
  }),
  Game.from({
    id: 'game-3',
    name: 'Star Streamer',
    description: 'Live streaming integration',
    categoryId: 'cat-3',
    gameType: 'external_stream',
    imageUrls: [],
    createdAt: new Date().toISOString(),
  }),
];

// Mock Activities
const mockActivities = [
  GameActivity.from({
    id: 'act-1',
    userId: 'user-1',
    gameId: 'game-1',
    type: 'played',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    details: { score: 15400 },
  }),
  GameActivity.from({
    id: 'act-2',
    userId: 'user-1',
    gameId: 'game-2',
    type: 'achieved',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    details: { achievementId: 'ach-1' },
  }),
  GameActivity.from({
    id: 'act-3',
    userId: 'user-1',
    gameId: 'game-3',
    type: 'streamed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    details: { streamId: 'stream-1' },
  }),
];

export const BasicFeed = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ maxWidth: 400, padding: 24, backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{ margin: '0 0 16px', color: 'var(--colors-text-primary)' }}>Activity Feed</h3>
          <GameActivityFeed activities={mockActivities} games={mockGames} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const EmptyFeed = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ maxWidth: 400, padding: 24, backgroundColor: 'var(--colors-surface-background)' }}>
          <h3 style={{ margin: '0 0 16px', color: 'var(--colors-text-primary)' }}>Activity Feed</h3>
          <GameActivityFeed activities={[]} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeFeed = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ maxWidth: 400, padding: 24, backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
          <h3 style={{ margin: '0 0 16px' }}>Recent Adventures</h3>
          <GameActivityFeed activities={mockActivities} games={mockGames} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};