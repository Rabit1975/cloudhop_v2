import React, { useState, useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SearchResultList } from './search-result-list.js';
import type { SearchResult } from './search-result-type.js';

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'HopHub General',
    description: 'The main gathering place for the CloudHop community. Join the conversation and connect with others.',
    type: 'Channel',
    imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_abstract_digi_0_1770835145692.png',
    link: '/channels/general',
  },
  {
    id: '2',
    title: 'Cyber Nebula RPG',
    description: 'An immersive RPG experience available now on GameHub. Explore the vast digital universe.',
    type: 'Game',
    imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_abstract_digi_0_1770835145692.png',
    link: '/gamehub/cyber-nebula',
  },
  {
    id: '3',
    title: 'Deep Space Lo-Fi',
    description: 'Relaxing beats to code and design to. Streaming live now in the Music Studio.',
    type: 'Music',
    imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_abstract_digi_0_1770835145692.png',
    link: '/music/playlist/lofi-beats',
  },
  {
    id: '4',
    title: 'Design Sync',
    description: 'Weekly sync meeting for the design team using HopMeets video conferencing.',
    type: 'Meeting',
    imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_abstract_digi_0_1770835145692.png',
    link: '/hopmeets/design-sync',
  },
];

export const BasicList = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', backgroundColor: 'var(--colors-surface-background)' }}>
          <SearchResultList results={mockResults} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const LoadingState = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', backgroundColor: 'var(--colors-surface-background)' }}>
          <SearchResultList loading />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const EmptyState = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', backgroundColor: 'var(--colors-surface-background)' }}>
          <SearchResultList results={[]} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const InteractiveList = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '32px', 
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '100vh',
          backgroundImage: 'var(--effects-gradients-nebula)'
        }}>
          <div style={{ marginBottom: '24px', color: 'var(--colors-text-primary)' }}>
            <h2 style={{ fontSize: 'var(--typography-sizes-heading-h3)' }}>Search Results</h2>
            <p style={{ color: 'var(--colors-text-secondary)' }}>
              Found {loading ? '...' : results.length} items matching "nebula"
            </p>
          </div>
          <SearchResultList 
            loading={loading} 
            results={results} 
            onResultClick={(item) => alert(`Clicked on ${item.title}`)}
          />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};