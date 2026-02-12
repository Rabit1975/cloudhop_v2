import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MessageInput } from './message-input.js';

const mockMessages = [
  { id: '1', user: 'Alice', text: 'Hey! Did you check out the new Music Studio in CloudHop?' },
  { id: '2', user: 'Bob', text: 'Yeah, it integrates perfectly with my YouTube playlists.' },
];

export const BasicUsage = () => {
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), user: 'You', text },
    ]);
  };

  return (
    <MockProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '400px',
          maxWidth: '600px',
          border: '1px solid var(--colors-border-subtle)',
          borderRadius: 'var(--borders-radius-medium)',
          overflow: 'hidden',
          backgroundColor: 'var(--colors-surface-background)',
        }}
      >
        <div style={{ flex: 1, padding: 'var(--spacing-medium)', overflowY: 'auto' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: 'var(--spacing-medium)',
                textAlign: msg.user === 'You' ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--typography-sizes-caption-default)',
                  color: 'var(--colors-text-secondary)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {msg.user}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  padding: 'var(--spacing-small) var(--spacing-medium)',
                  borderRadius: 'var(--borders-radius-medium)',
                  backgroundColor:
                    msg.user === 'You'
                      ? 'var(--colors-primary-default)'
                      : 'var(--colors-surface-secondary)',
                  color:
                    msg.user === 'You'
                      ? 'var(--colors-primary-contrast)'
                      : 'var(--colors-text-primary)',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <MessageInput onSendMessage={handleSend} />
      </div>
    </MockProvider>
  );
};

export const DisabledState = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', maxWidth: '600px' }}>
        <h3 style={{ color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
          Read-only Channel
        </h3>
        <MessageInput disabled placeholder="You do not have permission to send messages to this channel." />
      </div>
    </MockProvider>
  );
};

export const DarkThemeInput = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div
        style={{
          padding: 'var(--spacing-large)',
          maxWidth: '600px',
          backgroundColor: 'var(--colors-surface-background)',
          height: '100%',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <MessageInput placeholder="Message #general" />
      </div>
    </CloudrabbitTheme>
  );
};