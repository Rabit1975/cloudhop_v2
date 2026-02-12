import { Message } from './message.js';
import { mockMessages } from './message.mock.js';
import { MessageRole } from './message-role-type.js';

describe('Message', () => {
  it('should create a Message instance from a plain object', () => {
    const plainMessage = {
      id: '1',
      sessionId: 'session1',
      text: 'Hello',
      role: 'user' as MessageRole, // Cast to MessageRole to satisfy type
      createdAt: new Date().toISOString(),
    };
    const message = Message.from(plainMessage);

    expect(message).toBeInstanceOf(Message);
    expect(message.id).toBe(plainMessage.id);
    expect(message.sessionId).toBe(plainMessage.sessionId);
    expect(message.text).toBe(plainMessage.text);
    expect(message.role).toBe(plainMessage.role);
    expect(message.createdAt).toBe(plainMessage.createdAt);
  });

  it('should serialize a Message instance to a plain object', () => {
    const message = mockMessages()[0];
    const plainObject = message.toObject();

    expect(plainObject.id).toBe(message.id);
    expect(plainObject.sessionId).toBe(message.sessionId);
    expect(plainObject.text).toBe(message.text);
    expect(plainObject.role).toBe(message.role);
    expect(plainObject.createdAt).toBe(message.createdAt);
  });
});