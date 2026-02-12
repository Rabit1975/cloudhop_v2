import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchResultCard } from './search-result-card.js';
import styles from './search-result-card.module.scss';

describe('SearchResultCard', () => {
  it('should render the card title', () => {
    render(
      <MemoryRouter>
        <SearchResultCard result={{
          id: 'test-id',
          title: 'Test Title',
          link: '/test-link',
          type: 'Test Type',
        }} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the card description', () => {
    render(
      <MemoryRouter>
        <SearchResultCard result={{
          id: 'test-id',
          title: 'Test Title',
          link: '/test-link',
          type: 'Test Type',
          description: 'Test Description',
        }} />
      </MemoryRouter>
    );
    const descriptionElement = screen.getByText('Test Description');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should render the card type badge', () => {
    render(
      <MemoryRouter>
        <SearchResultCard result={{
          id: 'test-id',
          title: 'Test Title',
          link: '/test-link',
          type: 'Test Type',
        }} />
      </MemoryRouter>
    );
    const typeElement = screen.getByText('Test Type');
    expect(typeElement).toBeInTheDocument();
  });
});