import { Message } from './message.js';
import { mockMessage } from './message.mock.js';
import { PlainMessage } from './plain-message-type.js';

describe('Message', () => {
  it('has a Message.from() method', () => {
    expect(Message.from).toBeTruthy();
  });

  it('should create a Message instance from a plain object', () => {
    const plainMessage: PlainMessage = {
      id: '123',
      conversationId: '456',
      senderId: '789',
      text: 'Hello',
      createdAt: new Date().toISOString(),
      type: 'TEXT',
    };
    const message = Message.from(plainMessage);
    expect(message).toBeInstanceOf(Message);
    expect(message.id).toBe(plainMessage.id);
  });

  it('should serialize a Message instance to a plain object', () => {
    const message = mockMessage();
    const plainMessage = message.toObject();
    expect(plainMessage.id).toBe(message.id);
    expect(plainMessage.conversationId).toBe(message.conversationId);
  });
});