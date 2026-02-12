import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { SpaceSearchResult } from './space-search-result.js';

// Mock data creation helper
const createMockResult = (
  id: string,
  name: string,
  visibility: 'public' | 'private' | 'unlisted',
  description?: string
) => {
  // Create a Space entity
  const space = new Space(
    id,
    name,
    'user-1',
    ['user-1'],
    visibility,
    new Date().toISOString(),
    description
  );

  // Wrap in SearchResult entity
  // Casting space as any to satisfy SearchableContent type constraint in this mock context
  return new SearchResult(id, space as any, 1);
};

export const PublicSpaceResult = () => {
  const result = createMockResult(
    'space-1',
    'CloudHop Community',
    'public',
    'The official community space for CloudHop users to share ideas and feedback.'
  );

  return (
    <MockProvider>
      <div style={{ maxWidth: '340px', padding: '24px' }}>
        <SpaceSearchResult result={result} />
      </div>
    </MockProvider>
  );
};

export const PrivateSpaceResult = () => {
  const result = createMockResult(
    'space-2',
    'Top Secret Project',
    'private',
    'Confidential workspace for the new product launch team. Authorized personnel only.'
  );

  return (
    <MockProvider>
      <div style={{ maxWidth: '340px', padding: '24px' }}>
        <SpaceSearchResult result={result} />
      </div>
    </MockProvider>
  );
};

export const GridDisplay = () => {
  const results = [
    createMockResult('s1', 'Design System', 'public', 'Central hub for design tokens and assets.'),
    createMockResult('s2', 'Marketing Q1', 'private', 'Campaign planning for Q1.'),
    createMockResult('s3', 'Engineering', 'public', 'Engineering team announcements and docs.'),
    createMockResult('s4', 'Random', 'unlisted', 'Fun stuff and memes.'),
  ];

  return (
    <MockProvider>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px', 
        padding: '24px',
        backgroundColor: 'var(--colors-surface-background)'
      }}>
        {results.map((result) => (
          <SpaceSearchResult key={result.toObject().id} result={result} />
        ))}
      </div>
    </MockProvider>
  );
};