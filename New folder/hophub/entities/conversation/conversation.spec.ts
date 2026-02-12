import { Conversation } from './conversation.js';
import { mockConversations } from './conversation.mock.js';

describe('Conversation', () => {
  it('should create a Conversation instance from a plain object', () => {
    const mock = mockConversations()[0].toObject()
    const conversation = Conversation.from(mock);
    expect(conversation).toBeInstanceOf(Conversation);
    expect(conversation.id).toBe(mock.id);
  });

  it('should serialize a Conversation instance to a plain object', () => {
    const conversation = mockConversations()[0]
    const plainConversation = conversation.toObject();
    expect(plainConversation.id).toBe(conversation.id);
    expect(plainConversation.type).toBe(conversation.type);
  });

  it('has a Conversation.from() method', () => {
    expect(Conversation.from).toBeTruthy();
  });
});