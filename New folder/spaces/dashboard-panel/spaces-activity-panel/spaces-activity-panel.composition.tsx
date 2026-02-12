import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Space } from '@cloudrabbit/spaces.entities.space';
import { SpacesActivityPanel } from './spaces-activity-panel.js';

const mockSpaces = [
  Space.from({
    id: 'space-1',
    name: 'Nebula Explorers',
    description: 'Exploring the digital universe.',
    ownerId: 'user-1',
    members: Array(120).fill('user'),
    visibility: 'public',
    createdAt: new Date().toISOString(),
  }),
  Space.from({
    id: 'space-2',
    name: 'Design System Team',
    description: 'Internal design syncs.',
    ownerId: 'user-2',
    members: Array(15).fill('user'),
    visibility: 'private',
    createdAt: new Date().toISOString(),
  }),
  Space.from({
    id: 'space-3',
    name: 'Game Dev Hub',
    description: 'Unity and HTML5 game showcase.',
    ownerId: 'user-3',
    members: Array(450).fill('user'),
    visibility: 'public',
    createdAt: new Date().toISOString(),
  }),
];

export const BasicUsage = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', maxWidth: '360px', height: '500px' }}>
          <SpacesActivityPanel mockData={mockSpaces} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const NebulaVariant = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '40px', 
          maxWidth: '360px', 
          height: '500px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
        }}>
          <SpacesActivityPanel variant="nebula" mockData={mockSpaces} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', maxWidth: '360px', height: '400px' }}>
          <SpacesActivityPanel mockData={[]} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const LoadingState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '40px', maxWidth: '360px', height: '400px' }}>
           <SpacesActivityPanel /> 
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};