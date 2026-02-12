import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockConversation } from '@cloudrabbit/hophub.entities.conversation';
import { ConversationListItem } from './conversation-list-item.js';
import styles from './conversation-list-item.module.scss';

describe('ConversationListItem', () => {
  const mockConversation = createMockConversation({
    id: 'c1',
    type: 'CHANNEL',
    name: '#general',
    lastMessage: {
      id: 'msg-c1',
      conversationId: 'c1',
      senderId: 'user-1',
      text: 'Hello, world!',
      type: 'TEXT',
      createdAt: new Date().toISOString(),
    },
  });

  it('renders conversation name and last message', () => {
    render(
      <MockProvider>
          <ConversationListItem conversation={mockConversation} />
      </MockProvider>
    );
    expect(screen.getByText('#general')).toBeInTheDocument();
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('applies active class when activeConversationId matches', () => {
    const { container } = render(
      <MockProvider>
          <ConversationListItem conversation={mockConversation} activeConversationId="c1" />
      </MockProvider>
    );
    const conversationListItem = container.querySelector(`.${styles.conversationListItem}`);
    expect(conversationListItem).toHaveClass(styles.active);
  });

  it('renders unread badge when unreadCount is greater than 0', () => {
    const unreadConversation = createMockConversation({
      id: 'c2',
      type: 'DM',
      name: 'Test User',
      lastMessage: {
        id: 'msg-c2',
        conversationId: 'c2',
        senderId: 'user-2',
        text: 'New message',
        type: 'TEXT',
        createdAt: new Date().toISOString(),
      },
      unreadCount: 2,
    });
    render(
      <MockProvider>
          <ConversationListItem conversation={unreadConversation} />
      </MockProvider>
    );
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});