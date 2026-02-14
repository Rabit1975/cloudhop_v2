import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockGames } from '@cloudrabbit/gamehub.entities.game';
import { GameHubDashboardPanel } from './game-hub-dashboard-panel.js';
import styles from './game-hub-dashboard-panel.module.scss';

describe('GameHubDashboardPanel', () => {
  it('should render the panel title', () => {
    render(
      <MockProvider>
        <GameHubDashboardPanel />
      </MockProvider>
    );
    const titleElement = screen.getByText('Featured Games');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render "No games currently available" when no games are provided', () => {
    render(
      <MockProvider>
        <GameHubDashboardPanel mockGames={[]} />
      </MockProvider>
    );
    const emptyStateElement = screen.getByText('No games currently available in the hub.');
    expect(emptyStateElement).toBeInTheDocument();
  });

  it('should render the featured games when provided', () => {
    const mockGamesData = mockGames([
      {
        name: 'Cyber Racer X',
        description: 'Futuristic racing game',
        categoryId: '1',
        gameType: 'html5',
        imageUrls: ['https://example.com/cyber-racer-x.jpg'],
        createdAt: '2024-01-01',
      },
    ]);

    const { container } = render(
      <MockProvider>
        <GameHubDashboardPanel mockGames={mockGamesData} />
      </MockProvider>
    );

    const gameCardElements = container.querySelectorAll(`.${styles.cardWrapper}`);
    // The useListGames hook, when mocked with mockData, typically returns a default set of games (e.g., 4)
    // and then applies the provided mockGames as overrides. Thus, we expect 4 game cards.
    expect(gameCardElements.length).toBe(4);
  });
});