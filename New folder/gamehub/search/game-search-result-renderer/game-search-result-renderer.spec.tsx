import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { GameSearchResultRenderer } from './game-search-result-renderer.js';
import type { GameSearchResult } from './game-search-result-type.js';
import styles from './game-search-result-renderer.module.scss';

const mockGameResult: GameSearchResult = {
  id: 'game-1',
  relevanceScore: 0.95,
  content: {
    title: 'Cyber Odyssey',
    description: 'Dive into the neon-soaked streets of the digital frontier.',
    thumbnail: 'https://example.com/cyber-odyssey.jpg',
    platform: 'Unity',
    url: '/gamehub/cyber-odyssey',
  },
};

describe('GameSearchResultRenderer', () => {
  it('should render the game title', () => {
    const { container } = render(
      <MockProvider>
        <GameSearchResultRenderer result={mockGameResult} />
      </MockProvider>
    );
    const titleElement = container.querySelector(`.${styles.card} .${styles.title}`);
    expect(titleElement).toHaveTextContent('Cyber Odyssey');
  });

  it('should render the game description', () => {
    const { container } = render(
      <MockProvider>
        <GameSearchResultRenderer result={mockGameResult} />
      </MockProvider>
    );
    const descriptionElement = container.querySelector(`.${styles.card} .${styles.description}`);
    expect(descriptionElement).toHaveTextContent('Dive into the neon-soaked streets of the digital frontier.');
  });

  it('should render the platform badge', () => {
    const { container } = render(
      <MockProvider>
        <GameSearchResultRenderer result={mockGameResult} />
      </MockProvider>
    );
    const badgeElement = container.querySelector(`.${styles.footer} span`);
    expect(badgeElement).toHaveTextContent('Unity');
  });
});