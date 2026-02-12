import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockGames, Game, GameType, PlainGame } from '@cloudrabbit/gamehub.entities.game';
import { GameList } from './game-list.js';
// Removed unused import: import styles from './game-list.module.scss';

describe('GameList', () => {
  it('should render game cards when games are provided', () => {
    const gameData: Partial<PlainGame>[] = [{ id: '1', name: 'Test Game', description: 'test', categoryId: '123', gameType: 'html5' as GameType, createdAt: 'today', imageUrls: ['url1'] }];
    const games: Game[] = mockGames(gameData);
    render(
      <MockProvider>
        <GameList games={games} />
      </MockProvider>
    );
    expect(screen.getByText('Test Game')).toBeInTheDocument();
  });

  it('should render loading state when loading is true and no games are provided', () => {
    render(
      <MockProvider>
        <GameList loading />
      </MockProvider>
    );
    expect(screen.getByRole('status', { name: 'Loading games' })).toBeInTheDocument();
    // Corrected assertion to find skeleton cards by data-testid
    const skeletonCards = screen.getAllByTestId('skeleton-card');
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  it('should render empty state when no games are provided and loading is false', () => {
    render(
      <MockProvider>
        <GameList games={[]} />
      </MockProvider>
    );
    expect(screen.getByText('No games found')).toBeInTheDocument();
    expect(screen.getByText(/We couldn't find any games matching your criteria/i)).toBeInTheDocument();
  });

  it('should render custom empty state message', () => {
    render(
      <MockProvider>
        <GameList games={[]} emptyTitle="Custom Title" emptyMessage="Custom Message" />
      </MockProvider>
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Message')).toBeInTheDocument();
  });
});