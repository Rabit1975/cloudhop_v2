import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchResultList } from './search-result-list.js';
import styles from './search-result-list.module.scss';

const mockResults = [
  {
    id: '1',
    title: 'Test Result',
    description: 'This is a test result.',
    type: 'Test',
    imageUrl: 'https://example.com/image.png',
    link: '/test',
  },
];

describe('SearchResultList', () => {
  it('should render loading state', () => {
    render(
      <MemoryRouter>
        <SearchResultList loading />
      </MemoryRouter>
    );
    const loadingContainer = screen.getByTestId('loading-container');
    expect(loadingContainer).toHaveClass(styles.loadingContainer);
  });

  it('should render empty state', () => {
    render(
      <MemoryRouter>
        <SearchResultList results={[]} />
      </MemoryRouter>
    );
    const emptyContainer = screen.getByText('No results found matching your criteria.');
    expect(emptyContainer).toBeInTheDocument();
  });

  it('should render search results', () => {
    render(
      <MemoryRouter>
        <SearchResultList results={mockResults} />
      </MemoryRouter>
    );
    const searchResultElement = screen.getByText('Test Result');
    expect(searchResultElement).toBeInTheDocument();
  });
});