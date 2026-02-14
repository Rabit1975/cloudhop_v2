import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'; // Import for Vitest DOM matchers
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockGames } from '@cloudrabbit/gamehub.entities.game';
import { GameCollection } from './game-collection.js';
import styles from './game-collection.module.scss';

const games = mockGames([
  {
    name: "Cyber Racer X",
    tags: ["Racing", "Cyberpunk"],
    imageUrls: ["https://example.com/cyber-racer.jpg"]
  },
  {
    name: "Nebula Quest",
    gameType: "unity",
    tags: ["RPG", "Adventure"],
    imageUrls: ["https://example.com/nebula-quest.jpg"]
  }
]);

describe('GameCollection', () => {
  it('should render without errors', () => {
    const { container } = render(
      <MockProvider>
        <GameCollection games={games} />
      </MockProvider>
    );
    expect(container.querySelector(`.${styles.gameCollection}`)).toBeInTheDocument();
  });

  it('should render a title when provided', () => {
    const titleText = 'My Games';
    const { container } = render(
      <MockProvider>
        <GameCollection games={games} title={titleText} />
      </MockProvider>
    );
    expect(container.querySelector(`.${styles.title}`)?.textContent).toEqual(titleText);
  });

  it('should not render when games array is empty', () => {
    const { container } = render(
      <MockProvider>
        <GameCollection games={[]} />
      </MockProvider>
    );
    // GameCollection returns null when games are empty, so its specific elements should not be in the document.
    // The MockProvider itself will still render, so container.firstChild will not be null.
    expect(container.querySelector(`.${styles.gameCollection}`)).not.toBeInTheDocument();
  });
});