import React from 'react';
import { render } from '@testing-library/react';
import type { PlainMessage } from '@cloudrabbit/ai.entities.message';
import { ChatMessage } from './chat-message.js';
import styles from './chat-message.module.scss';

const mockMessage: PlainMessage = {
  id: '1',
  sessionId: 'session-1',
  role: 'user',
  text: 'Hello!',
  createdAt: new Date().toISOString(),
};

describe('ChatMessage', () => {
  it('should render user message correctly', () => {
    const { container } = render(<ChatMessage message={mockMessage} />);
    const messageElement = container.querySelector(`.${styles.chatMessage}`);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass(styles.user);
  });

  it('should render AI message correctly', () => {
    const aiMessage: PlainMessage = { ...mockMessage, role: 'ai' };
    const { container } = render(<ChatMessage message={aiMessage} />);
    const messageElement = container.querySelector(`.${styles.chatMessage}`);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass(styles.ai);
  });

  it('should render message text correctly', () => {
    const { container } = render(<ChatMessage message={mockMessage} />);
    const textElement = container.querySelector(`.${styles.text}`);
    expect(textElement?.textContent).toBe('Hello!');
  });
});