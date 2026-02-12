import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { createMockChannel } from '@cloudrabbit/hophub.entities.channel';
import { ChannelSearchResultItem, ChannelSearchableContent } from './channel-search-result-item.js';
import styles from './channel-search-result-item.module.scss';

describe('ChannelSearchResultItem', () => {
  it('should render the channel title', () => {
    const mockChannel = createMockChannel({
      name: 'Test Channel',
      description: 'A test channel for testing.',
      type: 'public',
    });

    const mockSearchableContent = new ChannelSearchableContent(
      mockChannel,
      '/hophub/channels'
    );

    const mockSearchResult = new SearchResult(
      'test-search-result',
      mockSearchableContent,
      0.9
    );

    render(
      <MemoryRouter>
        <ChannelSearchResultItem result={mockSearchResult} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Channel')).toBeInTheDocument();
  });

  it('should render the channel description', () => {
    const mockChannel = createMockChannel({
      name: 'Test Channel',
      description: 'A test channel for testing purposes.',
      type: 'public',
    });

    const mockSearchableContent = new ChannelSearchableContent(
      mockChannel,
      '/hophub/channels'
    );

    const mockSearchResult = new SearchResult(
      'test-search-result',
      mockSearchableContent,
      0.9
    );

    render(
      <MemoryRouter>
        <ChannelSearchResultItem result={mockSearchResult} />
      </MemoryRouter>
    );

    expect(screen.getByText('A test channel for testing purposes.')).toBeInTheDocument();
  });

  it('should apply the channelSearchResultItem class', () => {
    const mockChannel = createMockChannel({
      name: 'Test Channel',
      description: 'A test channel for testing.',
      type: 'public',
    });

    const mockSearchableContent = new ChannelSearchableContent(
      mockChannel,
      '/hophub/channels'
    );

    const mockSearchResult = new SearchResult(
      'test-search-result',
      mockSearchableContent,
      0.9
    );

    const { container } = render(
      <MemoryRouter>
        <ChannelSearchResultItem result={mockSearchResult} />
      </MemoryRouter>
    );

    const itemElement = container.querySelector(`.${styles.channelSearchResultItem}`);
    expect(itemElement).toBeInTheDocument();
  });
});