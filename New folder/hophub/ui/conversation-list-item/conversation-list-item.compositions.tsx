import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockConversation, Conversation, ConversationType } from '@cloudrabbit/hophub.entities.conversation';
import { ConversationListItem } from './conversation-list-item.js';

const mockImage = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_illustration__0_1770833862629.png";

const conversations: Conversation[] = [
  createMockConversation({
    id: 'c1',
    type: 'CHANNEL',
    name: '# general',
    imageUrl: mockImage,
    lastMessage: {
      id: 'msg-c1',
      conversationId: 'c1',
      senderId: 'user-2',
      text: 'Alice: Has anyone seen the new nebula theme?',
      type: 'TEXT',
      createdAt: new Date(Date.now() - (1000 * 60 * 5)).toISOString(),
    },
    unreadCount: 2,
  }),
  createMockConversation({
    id: 'c2',
    type: 'GROUP',
    name: 'Design Team',
    lastMessage: {
      id: 'msg-c2',
      conversationId: 'c2',
      senderId: 'user-3',
      text: 'Bob: The files are ready for review.',
      type: 'TEXT',
      createdAt: new Date(Date.now() - (1000 * 60 * 60 * 2)).toISOString(),
    },
    unreadCount: 0,
  }),
  createMockConversation({
    id: 'c3',
    type: 'DM',
    name: 'Charlie',
    lastMessage: {
      id: 'msg-c3',
      conversationId: 'c3',
      senderId: 'user-1',
      text: 'Sure, let\'s meet at 5.',
      type: 'TEXT',
      createdAt: new Date(Date.now() - (1000 * 60 * 60 * 25)).toISOString(),
    },
    unreadCount: 0,
  }),
  createMockConversation({
    id: 'c4',
    type: 'CHANNEL',
    name: '# random',
    imageUrl: mockImage,
    lastMessage: {
      id: 'msg-c4',
      conversationId: 'c4',
      senderId: 'system',
      text: 'System: User David joined the channel.',
      type: 'TEXT',
      createdAt: new Date(Date.now() - (1000 * 60 * 60 * 24 * 3)).toISOString(),
    },
    unreadCount: 5,
  }),
];

export const ConversationListPreview = () => {
  const [activeId, setActiveId] = useState('c1');

  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ 
          maxWidth: '360px', 
          backgroundColor: 'var(--colors-surface-background)', 
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid var(--colors-border-subtle)'
        }}>
          <h3 style={{ 
            marginTop: 0, 
            marginBottom: '16px', 
            color: 'var(--colors-text-primary)',
            fontSize: 'var(--typography-sizes-heading-h5)'
          }}>
            Messages
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversations.map((conv) => (
              <ConversationListItem
                key={conv.id}
                conversation={conv}
                activeConversationId={activeId}
                onClick={(c) => setActiveId(c.id)}
                currentUserId="user-1"
              />
            ))}
          </div>
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const CompactMode = () => {
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ 
          width: '80px', 
          backgroundColor: 'var(--colors-surface-background)', 
          padding: '16px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          borderRight: '1px solid var(--colors-border-subtle)',
          height: '400px'
        }}>
           {conversations.map((conv) => (
              <ConversationListItem
                key={conv.id}
                conversation={conv}
                isCompact
                activeConversationId="c2"
              />
            ))}
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};

export const UnreadStates = () => {
  const unreadConv = createMockConversation({
    id: 'u1',
    type: 'DM',
    name: 'Important Client',
    lastMessage: {
      id: 'msg-u1',
      conversationId: 'u1',
      senderId: 'client-user',
      text: 'Please check the contract attached.',
      type: 'TEXT',
      createdAt: new Date().toISOString(),
    },
    unreadCount: 12,
  });
  
  return (
    <MockProvider>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', maxWidth: '400px', backgroundColor: 'var(--colors-surface-background)' }}>
           <ConversationListItem conversation={unreadConv} />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};