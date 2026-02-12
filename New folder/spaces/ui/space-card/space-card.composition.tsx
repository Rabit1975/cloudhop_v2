import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { SpaceCard } from './space-card.js';

const publicSpace = Space.from({
  id: 'space-nebula',
  name: 'Nebula Explorers',
  description: 'A community for those who love to explore the vast unknown of the digital universe. Join us for weekly events and discussions.',
  ownerId: 'user-1',
  members: Array(1250).fill('user'),
  visibility: 'public',
  createdAt: new Date().toISOString(),
});

const privateSpace = Space.from({
  id: 'space-core',
  name: 'Core Systems',
  description: 'Restricted access for system administrators and core developers.',
  ownerId: 'admin',
  members: Array(5).fill('admin'),
  visibility: 'private',
  createdAt: new Date().toISOString(),
});

const unlistedSpace = Space.from({
  id: 'space-beta',
  name: 'Project Starjump',
  description: 'Confidential beta testing group for the next generation hyper-jump protocol.',
  ownerId: 'lead',
  members: Array(42).fill('tester'),
  visibility: 'unlisted',
  createdAt: new Date().toISOString(),
});

export const BasicSpaceCard = () => {
  return (
    <MockProvider>
      <div style={{ padding: '32px', maxWidth: '360px' }}>
        <SpaceCard space={publicSpace} />
      </div>
    </MockProvider>
  );
};

export const SpaceCardGrid = () => {
  return (
    <MockProvider>
      <div style={{ 
        padding: '32px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px',
        backgroundColor: 'var(--colors-surface-background)' 
      }}>
        <SpaceCard space={publicSpace} />
        <SpaceCard space={privateSpace} />
        <SpaceCard space={unlistedSpace} />
        <SpaceCard 
          space={Space.from({
            ...publicSpace.toObject(),
            id: 'space-music',
            name: 'Lo-Fi Lounge',
            description: 'Chill beats and coding streams. Relax and focus.',
          })} 
        />
      </div>
    </MockProvider>
  );
};