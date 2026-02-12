import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { ChatBubbleIcon } from './chat-bubble-icon.js';

export const BasicChatBubble = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', color: 'var(--colors-text-primary)' }}>
        <ChatBubbleIcon />
      </div>
    </CloudrabbitTheme>
  );
};

export const ColoredChatBubbles = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', gap: '16px', padding: '24px' }}>
        <ChatBubbleIcon color="var(--colors-primary-default)" />
        <ChatBubbleIcon color="var(--colors-secondary-default)" />
        <ChatBubbleIcon color="var(--colors-status-positive-default)" />
        <ChatBubbleIcon color="var(--colors-text-secondary)" />
      </div>
    </CloudrabbitTheme>
  );
};

export const SizedChatBubbles = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', color: 'var(--colors-text-primary)' }}>
        <ChatBubbleIcon size={16} />
        <ChatBubbleIcon size={24} />
        <ChatBubbleIcon size={32} />
        <ChatBubbleIcon size={48} />
      </div>
    </CloudrabbitTheme>
  );
};