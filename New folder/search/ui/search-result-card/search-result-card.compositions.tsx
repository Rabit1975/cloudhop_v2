import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SearchResultCard } from './search-result-card.js';

export const BasicSearchResult = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ maxWidth: '340px', padding: '24px' }}>
          <SearchResultCard />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const SearchResultsGrid = () => {
  const results = [
    {
      id: '1',
      title: 'HopHub General',
      description: 'The main gathering place for the CloudHop community. Join the conversation.',
      type: 'Channel',
      imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_backg_0_1770833860674.png',
      link: '/channels/general'
    },
    {
      id: '2',
      title: 'Cyber Nebula',
      description: 'An immersive RPG experience available now on GameHub.',
      type: 'Game',
      imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_backg_0_1770833860674.png',
      link: '/games/cyber-nebula'
    },
    {
      id: '3',
      title: 'Design Sync',
      description: 'Weekly sync meeting for the design team. Starts in 10 minutes.',
      type: 'Meeting',
      imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_backg_0_1770833860674.png',
      link: '/meets/design-sync'
    }
  ];

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px', 
          padding: '24px',
          backgroundColor: 'var(--colors-surface-background)'
        }}>
          {results.map(result => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeResult = () => {
  const result = {
    id: '4',
    title: 'Deep Space Lo-Fi',
    description: 'Relaxing beats to code and design to. Streaming live now.',
    type: 'Music',
    imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_backg_0_1770833860674.png',
    link: '/music/lofi'
  };

  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '48px', 
          background: 'var(--effects-gradients-nebula)',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ width: '340px' }}>
            <SearchResultCard result={result} />
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};