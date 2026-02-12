import { Message } from './message.js';

export function mockMessages(): Message[] {
  return [
    Message.from({
      id: 'msg-1',
      sessionId: 'session-1',
      text: 'Hello, how can I help you today?',
      role: 'ai',
      createdAt: new Date().toISOString(),
    }),
    Message.from({
      id: 'msg-2',
      sessionId: 'session-1',
      text: 'I would like to know more about CloudHop.',
      role: 'user',
      createdAt: new Date().toISOString(),
      userId: 'user-1',
    }),
    Message.from({
      id: 'msg-3',
      sessionId: 'session-1',
      text: 'CloudHop is a modular operating system for next-generation communication.',
      role: 'ai',
      createdAt: new Date().toISOString(),
    }),
  ];
}