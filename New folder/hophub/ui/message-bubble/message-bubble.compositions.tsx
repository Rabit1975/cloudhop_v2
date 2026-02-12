import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Message, mockMessage } from '@cloudrabbit/hophub.entities.message';
import { User, mockUsers } from '@cloudrabbit/cloudhop-platform.entities.user';
import { MessageBubble } from './message-bubble.js';

// Mock Data Setup
const users = mockUsers();
const currentUser = users[0];
const otherUser = users[1];

const textMessage = mockMessage({
  senderId: otherUser.id,
  text: 'Hey! Have you seen the new nebula theme for CloudHop? It looks amazing!',
  createdAt: new Date().toISOString(),
});

const selfMessage = mockMessage({
  senderId: currentUser.id,
  text: 'Yeah, I just checked it out. The gradients are super smooth.',
  createdAt: new Date().toISOString(),
});

const mediaMessage = mockMessage({
  senderId: otherUser.id,
  text: 'Check out this screenshot from the GameHub!',
  mediaAttachments: [
    {
      id: 'media-1',
      url: 'https://storage.googleapis.com/bit-generated-images/images/image_collection_of_diverse_and_mode_0_1770833880700.png',
      type: 'image/png',
      filename: 'game-preview.png',
    },
  ],
  createdAt: new Date().toISOString(),
});

export const ReceivedMessage = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <MessageBubble
          message={textMessage}
          sender={otherUser}
          isSelf={false}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const SentMessage = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <MessageBubble
          message={selfMessage}
          sender={currentUser}
          isSelf={true}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const WithMediaAttachment = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <MessageBubble
          message={mediaMessage}
          sender={otherUser}
          isSelf={false}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const ConversationThread = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ 
        padding: '24px', 
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--colors-surface-background)'
      }}>
        <MessageBubble
          message={textMessage}
          sender={otherUser}
          isSelf={false}
        />
        <MessageBubble
          message={selfMessage}
          sender={currentUser}
          isSelf={true}
        />
        <MessageBubble
          message={mediaMessage}
          sender={otherUser}
          isSelf={false}
        />
         <MessageBubble
          message={mockMessage({
            senderId: currentUser.id,
            text: 'Wow, that looks intense! Is that the new Unity engine integration?',
            createdAt: new Date().toISOString(),
          })}
          sender={currentUser}
          isSelf={true}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeThread = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '48px', 
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        // background: 'var(--colors-surface-background)',
        borderRadius: 'var(--borders-radius-large)'
      }}>
        <MessageBubble
          message={textMessage}
          sender={otherUser}
          isSelf={false}
        />
        <MessageBubble
          message={selfMessage}
          sender={currentUser}
          isSelf={true}
        />
        <MessageBubble
          message={mediaMessage}
          sender={otherUser}
          isSelf={false}
        />
      </div>
    </CloudrabbitTheme>
  );
};