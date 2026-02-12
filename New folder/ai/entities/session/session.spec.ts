import { Session } from './session.js';
import { mockSession } from './session.mock.js';

describe('Session', () => {
  it('should create a Session instance from a plain object', () => {
    const plainSession = {
      id: 'session-uuid-1',
      name: 'General Chat',
      createdAt: new Date().toISOString(),
      provider: 'openai',
      model: 'gpt-4',
      userId: 'user-uuid-1',
      updatedAt: new Date().toISOString(),
    };

    const session = Session.from(plainSession);

    expect(session).toBeInstanceOf(Session);
    expect(session.id).toBe(plainSession.id);
    expect(session.name).toBe(plainSession.name);
  });

  it('should serialize a Session instance to a plain object', () => {
    const session = mockSession();
    const plainSession = session.toObject();

    expect(plainSession).toEqual({
      id: session.id,
      name: session.name,
      createdAt: session.createdAt,
      provider: session.provider,
      model: session.model,
      userId: session.userId,
      updatedAt: session.updatedAt,
    });
  });

  it('has a Session.from() method', () => {
    expect(Session.from).toBeTruthy();
  });
});