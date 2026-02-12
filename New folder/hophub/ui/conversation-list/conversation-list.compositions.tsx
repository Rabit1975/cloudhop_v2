import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockConversation } from '@cloudrabbit/hophub.entities.conversation';
import { ConversationList } from './conversation-list.js';

const mockImage = "https://storage.googleapis.com/bit-generated-images/images/image_a_modern__minimalist_user_inte_0_1770835132097.png";

const mockConversations = [
  createMockConversation({
    id: 'c1',
    type: 'CHANNEL',
    name: '# general',
    imageUrl: mockImage,
    unreadCount: 3,
    lastMessage: {
      id: 'm1',
      conversationId: 'c1',
      senderId: 'u2',
      text: 'Hey everyone, check out the new design!',
      type: 'TEXT',
      createdAt: new Date().toISOString(),
    },
  }),
  createMockConversation({
    id: 'c2',
    type: 'DM',
    name: 'Alice',
    imageUrl: mockImage,
    unreadCount: 0,
    lastMessage: {
      id: 'm2',
      conversationId: 'c2',
      senderId: 'u3',
      text: 'Sounds good, see you then.',
      type: 'TEXT',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  }),
  createMockConversation({
    id: 'c3',
    type: 'GROUP',
    name: 'Project Alpha',
    imageUrl: mockImage,
    unreadCount: 5,
    lastMessage: {
      id: 'm3',
      conversationId: 'c3',
      senderId: 'u4',
      text: 'File uploaded: specs.pdf',
      type: 'MEDIA',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  }),
];

export const BasicConversationList = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{
          width: 320,
          height: 500,
          border: '1px solid var(--colors-border-subtle)',
          background: 'var(--colors-surface-background)',
          borderRadius: 'var(--borders-radius-medium)'
        }}>
          <ConversationList conversations={mockConversations} currentUserId="me" />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const CompactList = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{
          width: 80,
          height: 500,
          border: '1px solid var(--colors-border-subtle)',
          background: 'var(--colors-surface-background)',
          borderRadius: 'var(--borders-radius-medium)'
        }}>
          <ConversationList conversations={mockConversations} isCompact currentUserId="me" />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const InteractiveList = () => {
  const [activeId, setActiveId] = useState<string>('c1');

  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{
          width: 320,
          height: 500,
          border: '1px solid var(--colors-border-subtle)',
          background: 'var(--colors-surface-background)',
          borderRadius: 'var(--borders-radius-medium)'
        }}>
          <ConversationList
            conversations={mockConversations}
            activeConversationId={activeId}
            onConversationClick={(c) => setActiveId(c.id)}
            currentUserId="me"
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const EmptyState = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{
          width: 320,
          height: 200,
          border: '1px solid var(--colors-border-subtle)',
          background: 'var(--colors-surface-background)',
          borderRadius: 'var(--borders-radius-medium)'
        }}>
          <ConversationList conversations={[]} currentUserId="me" />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};