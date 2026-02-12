import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { createMockChannel } from '@cloudrabbit/hophub.entities.channel';
import { ChannelSearchResultItem, ChannelSearchableContent } from './channel-search-result-item.js';

const mockChannel = createMockChannel({
  name: 'HopHub Design',
  description: 'Official channel for design discussions and feedback.',
  type: 'public',
});

const mockSearchableContentForChannel = new ChannelSearchableContent(
  mockChannel,
  '/hophub/channels'
);

const mockSearchResult = new SearchResult(
  'search-result-1',
  mockSearchableContentForChannel,
  0.95
);

const mockPrivateChannel = createMockChannel({
  name: 'Core Team',
  description: 'Private discussions for the core engineering team.',
  type: 'private',
});

const mockSearchableContentForPrivateChannel = new ChannelSearchableContent(
  mockPrivateChannel,
  '/hophub/channels'
);

const mockPrivateSearchResult = new SearchResult(
  'search-result-2',
  mockSearchableContentForPrivateChannel,
  0.88
);

export const BasicChannelItem = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', maxWidth: '400px' }}>
          <ChannelSearchResultItem result={mockSearchResult} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const PrivateChannelItem = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', maxWidth: '400px' }}>
          <ChannelSearchResultItem result={mockPrivateSearchResult} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeChannelItem = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{
          padding: '48px',
          background: 'var(--effects-gradients-nebula)',
          minHeight: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ width: '400px' }}>
            <ChannelSearchResultItem result={mockSearchResult} />
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};