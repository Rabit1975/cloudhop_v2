import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMessage } from '@cloudrabbit/hophub.entities.message';
import { User, mockUsers } from '@cloudrabbit/cloudhop-platform.entities.user';
import { MessageList } from './message-list.js';

// Mock scrollIntoView for tests
beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  HTMLElement.prototype.scrollIntoView = () => {};
});

const avatarUrl = 'https://example.com/avatar.png';

// Use mockUsers to create valid User objects
const rawUsers = mockUsers(); // Call without arguments
const currentUser: User = { ...rawUsers[0], imageUrl: avatarUrl } as any; // Create a new object to assign imageUrl
const otherUser: User = { ...rawUsers[1], imageUrl: avatarUrl } as any; // Create a new object to assign imageUrl

const users = [currentUser, otherUser];

const initialMessages = [
  mockMessage({
    id: 'msg-1',
    senderId: otherUser.id,
    text: 'Hello!',
    createdAt: new Date().toISOString(),
  }),
];

describe('MessageList', () => {
  it('should render messages', () => {
    render(
      <MockProvider>
        <div style={{ height: '500px', width: '100%', maxWidth: '600px', border: '1px solid var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)' }}>
          <MessageList
            messages={initialMessages}
            currentUser={currentUser}
            users={users}
          />
        </div>
      </MockProvider>
    );

    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('should display "Unknown User" when sender is not found', () => {
    const unknownMessage = mockMessage({
      id: 'unknown-msg',
      senderId: 'unknown-user',
      text: 'Where am I?',
      createdAt: new Date().toISOString(),
    });

    render(
      <MockProvider>
        <div style={{ height: '500px', width: '100%', maxWidth: '600px', border: '1px solid var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)' }}>
          <MessageList
            messages={[unknownMessage]}
            currentUser={currentUser}
            users={users}
          />
        </div>
      </MockProvider>
    );

    expect(screen.getByText('Unknown User')).toBeInTheDocument();
  });
});