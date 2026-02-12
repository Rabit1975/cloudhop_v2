import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { SectionLayout } from '@cloudrabbit/design.layouts.section-layout';
import type { PlainMessage } from '@cloudrabbit/ai.entities.message';
import { ChatMessage } from './chat-message.js';

const aiAvatar = 'https://storage.googleapis.com/bit-generated-images/images/image_a_sleek__modern__and_abstract__0_1770835147850.png';
const userAvatar = 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g4d020c5f57d2fce91818bd2aa0c267cf80d28c44e0eb14e427ef7d61bfee2e2c43ae15335536b668dde35e229de2397550e2914526f398c09a5744eb03d09435_1280.png';

const mockMessages: PlainMessage[] = [
  {
    id: '1',
    sessionId: 'session-1',
    role: 'user',
    text: 'Hello! Can you help me generate some ideas for my new game on GameHub?',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    userId: 'user-1'
  },
  {
    id: '2',
    sessionId: 'session-1',
    role: 'ai',
    text: 'Absolutely! I\'d love to help. What genre are you interested in? We could look into RPGs, puzzle games, or maybe something action-packed using Unity.',
    createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: '3',
    sessionId: 'session-1',
    role: 'user',
    text: 'I was thinking of a sci-fi puzzle game set in a nebula.',
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    userId: 'user-1'
  },
  {
    id: '4',
    sessionId: 'session-1',
    role: 'ai',
    text: 'That sounds fantastic! A "Nebula Puzzle" game could use gravity mechanics and light refraction puzzles. I can generate some concept art for the background if you like.',
    createdAt: new Date(Date.now() - 1000 * 60).toISOString(),
  }
];

export const ChatConversation = () => {
  return (
    <CloudrabbitTheme>
      <SectionLayout 
        title="AI Assistant" 
        subtitle="Chat with CloudHop AI to brainstorm ideas and generate content."
        align="center"
      >
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          padding: '24px',
          backgroundColor: 'var(--colors-surface-background)',
          borderRadius: 'var(--borders-radius-large)',
          border: '1px solid var(--colors-border-subtle)'
        }}>
          {mockMessages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              avatarSrc={msg.role === 'ai' ? aiAvatar : userAvatar}
            />
          ))}
        </div>
      </SectionLayout>
    </CloudrabbitTheme>
  );
};

export const SingleUserMessage = () => {
  const message: PlainMessage = {
    id: 'msg-1',
    sessionId: 'sess-1',
    role: 'user',
    text: 'Is the HopMeets video conferencing feature available for all users?',
    createdAt: new Date().toISOString(),
    userId: 'u1'
  };

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '40px', maxWidth: '600px' }}>
        <ChatMessage message={message} avatarSrc={userAvatar} />
      </div>
    </CloudrabbitTheme>
  );
};

export const SingleAiMessage = () => {
  const message: PlainMessage = {
    id: 'msg-2',
    sessionId: 'sess-1',
    role: 'ai',
    text: 'Yes, HopMeets is available to everyone! You can start a meeting directly from any channel or DM.',
    createdAt: new Date().toISOString(),
  };

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '40px', maxWidth: '600px' }}>
        <ChatMessage message={message} avatarSrc={aiAvatar} />
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeChat = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <SectionLayout title="Dark Mode Interface" align="left">
        <div style={{ 
          maxWidth: '700px',
          padding: '32px',
          background: 'var(--effects-gradients-surface)',
          borderRadius: 'var(--borders-radius-large)',
          border: '1px solid var(--colors-border-subtle)',
          boxShadow: 'var(--effects-shadows-medium)'
        }}>
          {mockMessages.slice(0, 2).map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              avatarSrc={msg.role === 'ai' ? aiAvatar : undefined}
            />
          ))}
        </div>
      </SectionLayout>
    </CloudrabbitTheme>
  );
};