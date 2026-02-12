import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockGames } from '@cloudrabbit/gamehub.entities.game';
import { GameCard } from './game-card.js';
import styles from './game-card.module.scss';

const [sampleGame] = mockGames([{ name: 'Test Game', imageUrls: ['test.jpg'], gameType: 'html5' }]);

it('should render game name', () => {
  const { container } = render(
    <MockProvider>
      <GameCard game={sampleGame} />
    </MockProvider>
  );
  const titleElement = container.querySelector(`.${styles.gameCard} h3`);
  expect(titleElement).toHaveTextContent('Test Game');
});

it('should render platform badge', () => {
  const { container } = render(
    <MockProvider>
      <GameCard game={sampleGame} />
    </MockProvider>
  );
  const badgeElement = container.querySelector(`.${styles.platformBadge}`);
  expect(badgeElement).toHaveTextContent('HTML5');
});

it('should render rating when provided', () => {
  const { container } = render(
    <MockProvider>
      <GameCard game={sampleGame} rating={4.5} />
    </MockProvider>
  );
  const ratingElement = container.querySelector(`.${styles.rating} span`);
  expect(ratingElement).toHaveTextContent('4.5');
});