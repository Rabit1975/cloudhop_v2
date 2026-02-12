import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { DirectMessageSearchResultItem } from './direct-message-search-result-item.js';

const mockDmResult = {
  id: 'dm-123',
  title: 'Alice, Bob',
  description: 'Alice: Hey, did you see the new design specs?',
  type: 'DM',
  link: '/hophub?conversationId=dm-123',
  imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_user_avatar_icon_for__0_1770835141208.png',
  data: {
    participantIds: ['user-1', 'user-2'],
    lastMessageAt: '2023-10-27T10:00:00Z',
  },
};

const mockDmResultNoImage = {
  id: 'dm-456',
  title: 'Charlie',
  description: 'You: Sounds good, see you then!',
  type: 'DM',
  link: '/hophub?conversationId=dm-456',
  data: {
    participantIds: ['user-3'],
  },
};

export const BasicDirectMessageResult = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ maxWidth: '360px', padding: '24px' }}>
          <DirectMessageSearchResultItem result={mockDmResult} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DirectMessageResultWithoutImage = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ maxWidth: '360px', padding: '24px' }}>
          <DirectMessageSearchResultItem result={mockDmResultNoImage} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DirectMessageGrid = () => {
  const results = [
    mockDmResult,
    mockDmResultNoImage,
    {
      id: 'dm-789',
      title: 'Design Team Sync',
      description: 'Sarah: Meeting started.',
      type: 'Group',
      link: '/hophub?conversationId=dm-789',
      imageUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_user_avatar_icon_for__0_1770835141208.png',
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
            <DirectMessageSearchResultItem key={result.id} result={result} />
          ))}
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeDirectMessage = () => {
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
          <div style={{ width: '360px' }}>
            <DirectMessageSearchResultItem result={mockDmResult} />
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};