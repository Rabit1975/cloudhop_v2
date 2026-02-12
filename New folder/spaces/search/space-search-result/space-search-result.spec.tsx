import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { SpaceSearchResult } from './space-search-result.js';
import styles from './space-search-result.module.scss';

describe('SpaceSearchResult', () => {
  const createMockResult = (
    id: string,
    name: string,
    visibility: 'public' | 'private' | 'unlisted',
    description?: string
  ) => {
    const space = new Space(
      id,
      name,
      'user-1',
      ['user-1'],
      visibility,
      new Date().toISOString(),
      description
    );
    return new SearchResult(id, space as any, 1);
  };

  it('should render the space name', () => {
    const result = createMockResult('space-1', 'CloudHop Community', 'public');
    render(
      <MockProvider>
        <SpaceSearchResult result={result} />
      </MockProvider>
    );
    const titleElement = screen.getByText('CloudHop Community');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the visibility badge', () => {
    const result = createMockResult('space-1', 'CloudHop Community', 'public');
    render(
      <MockProvider>
        <SpaceSearchResult result={result} />
      </MockProvider>
    );
    const badgeElement = screen.getByText('Public');
    expect(badgeElement).toBeInTheDocument();
  });

  it('should render the icon overlay', () => {
    const result = createMockResult('space-1', 'CloudHop Community', 'public');
    render(
      <MockProvider>
        <SpaceSearchResult result={result} />
      </MockProvider>
    );
    const iconOverlayElement = document.querySelector(`.${styles.iconOverlay}`);
    expect(iconOverlayElement).toBeInTheDocument();
  });
});