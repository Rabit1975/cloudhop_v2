import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { createMockConversation } from '@cloudrabbit/hophub.entities.conversation';
import { RecentConversationsPanel } from './recent-conversations-panel.js';

const mockImage = 'https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_illustration__0_1770835145620.png';

const mockConversations = [
  createMockConversation({
    id: 'c1',
    type: 'CHANNEL',
    name: '# general',
    unreadCount: 3,
    imageUrl: mockImage,
    lastMessage: {
      id: 'm1',
      conversationId: 'c1',
      senderId: 'u2',
      text: 'Has anyone seen the new design?',
      type: 'TEXT',
      createdAt: new Date().toISOString(),
    }
  }),
  createMockConversation({
    id: 'c2',
    type: 'DM',
    name: 'Alice',
    unreadCount: 0,
    imageUrl: mockImage,
    lastMessage: {
      id: 'm2',
      conversationId: 'c2',
      senderId: 'u3',
      text: 'Sure, lets sync later.',
      type: 'TEXT',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }
  }),
  createMockConversation({
    id: 'c3',
    type: 'GROUP',
    name: 'Project Alpha',
    unreadCount: 1,
    imageUrl: mockImage,
    lastMessage: {
      id: 'm3',
      conversationId: 'c3',
      senderId: 'u4',
      text: 'Updated the roadmap.',
      type: 'TEXT',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  })
];

export const BasicUsage = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ height: 500, width: 350, padding: 24 }}>
          <RecentConversationsPanel conversations={mockConversations} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const LoadingState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ height: 500, width: 350, padding: 24 }}>
          <RecentConversationsPanel />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ height: 300, width: 350, padding: 24 }}>
          <RecentConversationsPanel conversations={[]} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const DarkModeWithNebula = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          height: 600, 
          width: '100%', 
          padding: 40,
          background: 'var(--colors-surface-background)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ width: 380, height: 500 }}>
             <RecentConversationsPanel 
               conversations={mockConversations} 
               style={{ 
                 boxShadow: 'var(--effects-shadows-large)',
                 border: '1px solid var(--colors-border-subtle)'
               }}
             />
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};