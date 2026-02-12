import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PlayerSearchResultRenderer } from './player-search-result-renderer.js';
import styles from './player-search-result-renderer.module.scss';
import type { PlayerContent } from './player-content-type.js'; // Import PlayerContent type

describe('PlayerSearchResultRenderer', () => {
  const mockPlayerContent: PlayerContent = {
    id: 'player-u-1', // Required by PlainSearchableContent
    type: 'player',   // Required by PlainSearchableContent
    title: 'Cosmic Traveler', // Required by PlainSearchableContent
    url: '/profile?userId=u-1', // Required by PlainSearchableContent
    userId: 'u-1',
    username: 'cosmic_traveler',
    displayName: 'Cosmic Traveler',
    avatarUrl: 'https://example.com/avatar.jpg',
    statusMessage: 'Drifting through the nebula...',
    presenceStatus: 'online',
  };

  const mockResult = {
    id: 'res-1',
    relevanceScore: 0.95,
    content: mockPlayerContent, // Assign the fully compliant PlayerContent
  };

  it('should render the player\'s display name', () => {
    const { container } = render(
      <MemoryRouter>
        <PlayerSearchResultRenderer result={mockResult} />
      </MemoryRouter>
    );
    const headingElement = container.querySelector(`.${styles.name}`);
    expect(headingElement).toHaveTextContent('Cosmic Traveler');
  });

  it('should render the player\'s username', () => {
    const { container } = render(
      <MemoryRouter>
        <PlayerSearchResultRenderer result={mockResult} />
      </MemoryRouter>
    );
    const usernameElement = container.querySelector(`.${styles.username}`);
    expect(usernameElement).toHaveTextContent('@cosmic_traveler');
  });

  it('should render the player\'s status message', () => {
    const { container } = render(
      <MemoryRouter>
        <PlayerSearchResultRenderer result={mockResult} />
      </MemoryRouter>
    );
    const statusElement = container.querySelector(`.${styles.status}`);
    expect(statusElement).toHaveTextContent('Drifting through the nebula...');
  });
});