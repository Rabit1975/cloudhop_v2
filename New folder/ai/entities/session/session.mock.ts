import { Session } from './session.js';
import { PlainSession } from './session-type.js';

export function mockSession(overrides: Partial<PlainSession> = {}): Session {
  const defaultSession: PlainSession = {
    id: 'session-uuid-1',
    name: 'General Chat',
    createdAt: new Date().toISOString(),
    provider: 'openai',
    model: 'gpt-4',
    userId: 'user-uuid-1',
    updatedAt: new Date().toISOString(),
  };

  return Session.from({ ...defaultSession, ...overrides });
}

export function mockSessions(): Session[] {
  return [
    mockSession({
      id: 'session-uuid-1',
      name: 'Creative Brainstorming',
      model: 'gpt-4',
      provider: 'openai',
    }),
    mockSession({
      id: 'session-uuid-2',
      name: 'Code Review Assistant',
      model: 'claude-2',
      provider: 'anthropic',
    }),
    mockSession({
      id: 'session-uuid-3',
      name: 'Meeting Summary',
      model: 'gpt-3.5-turbo',
      provider: 'openai',
    }),
  ];
}