import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GameActivity } from '@cloudrabbit/gamehub.entities.game-activity';
import { Game } from '@cloudrabbit/gamehub.entities.game';
import { GameActivityFeed } from './game-activity-feed.js';
import styles from './game-activity-feed.module.scss';

describe('GameActivityFeed', () => {
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
  ];

  const mockActivities = [
    GameActivity.from({
      id: 'act-1',
      userId: 'user-1',
      gameId: 'game-1',
      type: 'played',
      timestamp: new Date().toISOString(),
      details: { score: 15400 },
    }),
  ];

  it('should render the activity feed items', () => {
    const { container } = render(
      <MemoryRouter>
        <GameActivityFeed activities={mockActivities} games={mockGames} />
      </MemoryRouter>
    );
    const item = container.querySelector(`.${styles.item}`);
    expect(item).toBeInTheDocument();
  });

  it('should render the game title', () => {
    const { container } = render(
      <MemoryRouter>
        <GameActivityFeed activities={mockActivities} games={mockGames} />
      </MemoryRouter>
    );
    const gameTitle = container.querySelector(`.${styles.gameTitle}`);
    expect(gameTitle).toHaveTextContent('Nebula Racers');
  });

  it('should render empty state when no activities are passed', () => {
    const { container } = render(
      <MemoryRouter>
        <GameActivityFeed activities={[]} games={mockGames} />
      </MemoryRouter>
    );
    const emptyState = container.querySelector(`.${styles.empty}`);
    expect(emptyState).toBeInTheDocument();
  });
});