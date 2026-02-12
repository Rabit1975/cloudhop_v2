import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockMessage } from '@cloudrabbit/hophub.entities.message';
import { mockUsers } from '@cloudrabbit/cloudhop-platform.entities.user';
import { MessageBubble } from './message-bubble.js';

const users = mockUsers();
const currentUser = users[0];
const otherUser = users[1];

describe('MessageBubble', () => {
  it('should render a received message correctly', () => {
    const message = mockMessage({
      senderId: otherUser.id,
      text: 'Hello!',
      createdAt: new Date().toISOString(),
    });
    const { container } = render(
      <MessageBubble message={message} sender={otherUser} isSelf={false} />
    );
    const messageText = container.querySelector('.text');
    expect(messageText).toBeDefined();
    expect(messageText?.textContent).toBe('Hello!');
  });

  it('should render a sent message correctly', () => {
    const message = mockMessage({
      senderId: currentUser.id,
      text: 'Hi there!',
      createdAt: new Date().toISOString(),
    });
    const { container } = render(
      <MessageBubble message={message} sender={currentUser} isSelf={true} />
    );
    const messageText = container.querySelector('.text');
    expect(messageText).toBeDefined();
    expect(messageText?.textContent).toBe('Hi there!');
  });

  it('should render the sender\'s avatar', () => {
    const message = mockMessage({
      senderId: otherUser.id,
      text: 'Avatar test',
      createdAt: new Date().toISOString(),
    });
    render(<MessageBubble message={message} sender={otherUser} isSelf={false} />);
    const avatar = screen.getByRole('img', {name: otherUser.displayName});
    expect(avatar).toBeDefined();
  });
});