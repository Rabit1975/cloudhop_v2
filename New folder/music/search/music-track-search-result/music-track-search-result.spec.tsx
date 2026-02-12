import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { MusicTrackSearchResult } from './music-track-search-result.js';
import styles from './music-track-search-result.module.scss';

const mockThumbnail = "https://example.com/thumbnail.jpg";

const mockTrackContent = {
  id: 'track-1',
  title: 'Test Track',
  artist: 'Test Artist',
  thumbnailUrl: mockThumbnail,
  sourceType: 'upload',
  duration: 245,
};

const mockResult = {
  id: 'result-1',
  content: mockTrackContent,
  relevanceScore: 0.95,
} as unknown as SearchResult;

describe('MusicTrackSearchResult', () => {
  it('should render the track title and artist', () => {
    const { container } = render(
      <MemoryRouter>
        <MusicTrackSearchResult result={mockResult} />
      </MemoryRouter>
    );

    expect(container.querySelector(`.${styles.card} .${styles.title}`)?.textContent).toBe('Test Track');
    expect(container.querySelector(`.${styles.artist}`)?.textContent).toBe('Test Artist');
  });

  it('should render the source type badge and duration', () => {
    const { container } = render(
      <MemoryRouter>
        <MusicTrackSearchResult result={mockResult} />
      </MemoryRouter>
    );

    expect(container.querySelector(`.${styles.badge}`)?.textContent).toBe('upload');
    expect(container.querySelector(`.${styles.duration}`)?.textContent).toBe('4:05');
  });

  it('should render the link to the track page', () => {
    const { container } = render(
      <MemoryRouter>
        <MusicTrackSearchResult result={mockResult} />
      </MemoryRouter>
    );

    const linkElement = container.querySelector(`.${styles.musicTrackSearchResult}`) as HTMLAnchorElement;
    expect(linkElement.href).toContain('/music/track/track-1');
  });
});