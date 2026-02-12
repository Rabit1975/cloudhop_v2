import React, { useState } from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMessage, Message } from '@cloudrabbit/hophub.entities.message';
import { User, mockUsers } from '@cloudrabbit/cloudhop-platform.entities.user';
import { MessageList } from './message-list.js';

const avatarUrl = 'https://storage.googleapis.com/bit-generated-images/images/image_minimalist_abstract_background_0_1770835144304.png';

// Use mockUsers to create valid User objects. mockUsers() should return an array of User entities.
const rawUsers = mockUsers(); // Call without arguments as per typical usage for mock functions returning arrays
const currentUser: User = { ...rawUsers[0], imageUrl: avatarUrl } as any; // Create a new object to assign imageUrl
const otherUser: User = { ...rawUsers[1], imageUrl: avatarUrl } as any; // Create a new object to assign imageUrl

const users = [currentUser, otherUser];

const initialMessages = [
  mockMessage({
    id: 'msg-1',
    senderId: otherUser.id,
    text: 'Welcome to CloudHop! This is the start of the conversation.',
    createdAt: new Date(Date.now() - 1000000).toISOString(),
  }),
  mockMessage({
    id: 'msg-2',
    senderId: currentUser.id,
    text: 'Thanks! The new interface looks amazing.',
    createdAt: new Date(Date.now() - 500000).toISOString(),
  }),
  mockMessage({
    id: 'msg-3',
    senderId: otherUser.id,
    text: 'We are glad you like it. Feel free to explore the spaces.',
    createdAt: new Date(Date.now() - 100000).toISOString(),
  }),
];

export const BasicMessageList = () => {
  return (
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
};

export const LiveChatSimulation = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addMessage = () => {
    const isSelf = Math.random() > 0.5;
    const newMessage = mockMessage({
      id: `new-msg-${Date.now()}`,
      senderId: isSelf ? currentUser.id : otherUser.id,
      text: `This is a new message sent at ${new Date().toLocaleTimeString()}`,
      createdAt: new Date().toISOString(),
    });
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <MockProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', width: '100%' }}>
        <div style={{ height: '400px', border: '1px solid var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)', overflow: 'hidden' }}>
          <MessageList
            messages={messages}
            currentUser={currentUser}
            users={users}
          />
        </div>
        <button
          onClick={addMessage}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--colors-primary-default)',
            color: 'var(--colors-primary-contrast)',
            border: 'none',
            borderRadius: 'var(--borders-radius-medium)',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Simulate Incoming Message
        </button>
      </div>
    </MockProvider>
  );
};

export const EmptyConversation = () => {
  return (
    <MockProvider>
      <div style={{ height: '300px', width: '100%', maxWidth: '600px', border: '1px solid var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)' }}>
        <MessageList
          messages={[]}
          currentUser={currentUser}
          users={users}
        />
      </div>
    </MockProvider>
  );
};