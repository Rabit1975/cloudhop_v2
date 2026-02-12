import { mockMediaAttachments } from '@cloudrabbit/hophub.entities.media-attachment';
import { Message } from './message.js';
import { PlainMessage } from './plain-message-type.js';

export function mockMessage(override?: Partial<PlainMessage>): Message {
  const defaultMessage: PlainMessage = {
    id: `msg-${Math.floor(Math.random() * 100000)}`,
    conversationId: `conv-${Math.floor(Math.random() * 1000)}`,
    senderId: `user-${Math.floor(Math.random() * 1000)}`,
    text: 'Hello, this is a message.',
    createdAt: new Date().toISOString(),
    type: 'TEXT',
    mediaAttachments: [],
    readBy: [],
    ...override,
  };
  return Message.from(defaultMessage);
}

export function mockMessages(count: number = 5): Message[] {
  return Array.from({ length: count }, (_, index) =>
    mockMessage({ id: `msg-mock-${index}`, text: `Message content ${index}` })
  );
}