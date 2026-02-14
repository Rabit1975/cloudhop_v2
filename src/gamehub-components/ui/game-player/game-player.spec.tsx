import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { GamePlayer } from './game-player.js';
import styles from './game-player.module.scss';

const mockGameUrl = 'about:blank';
const mockTitle = 'Test Game';
const mockCoverUrl = 'https://example.com/cover.jpg';

describe('GamePlayer', () => {
  it('renders the play button and title when coverUrl is provided and autoPlay is false', () => {
    const { container } = render(
      <MockProvider>
        <GamePlayer gameUrl={mockGameUrl} platform="html5" title={mockTitle} coverUrl={mockCoverUrl} autoPlay={false} />
      </MockProvider>
    );

    const playButton = container.querySelector(`.${styles.playButton}`) as HTMLButtonElement;
    const titleOverlay = container.querySelector(`.${styles.titleOverlay}`);

    expect(playButton).toBeInTheDocument();
    expect(titleOverlay).toHaveTextContent(mockTitle);
  });

  it('starts playing the game when the play button is clicked', () => {
    const { container } = render(
      <MockProvider>
        <GamePlayer gameUrl={mockGameUrl} platform="html5" title={mockTitle} coverUrl={mockCoverUrl} autoPlay={false} />
      </MockProvider>
    );

    const playButton = container.querySelector(`.${styles.playButton}`) as HTMLButtonElement;
    fireEvent.click(playButton);

    const iframe = container.querySelector(`.${styles.frame}`) as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
  });

  it('renders the iframe when autoPlay is true', () => {
    const { container } = render(
      <MockProvider>
        <GamePlayer gameUrl={mockGameUrl} platform="html5" title={mockTitle} coverUrl={mockCoverUrl} autoPlay={true} />
      </MockProvider>
    );

    const iframe = container.querySelector(`.${styles.frame}`) as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
  });
});