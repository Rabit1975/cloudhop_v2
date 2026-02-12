import { mockChannels } from '@cloudrabbit/hophub.entities.channel';
import { mockDirectMessages } from '@cloudrabbit/hophub.entities.direct-message';
import { mockMessages } from '@cloudrabbit/hophub.entities.message';
import { Conversation } from './conversation.js';
import { ConversationMember, PlainConversation } from './conversation-type.js';

export function mockConversations(): Conversation[] {
  const channels = mockChannels();
  const directMessages = mockDirectMessages();
  const messages = mockMessages();

  const channelConversations = channels.map((channel) => {
    const plainChannel = channel.toObject();
    const members: ConversationMember[] = plainChannel.memberIds.map((id) => ({
      userId: id,
      role: id === plainChannel.ownerId ? 'admin' : 'member',
      joinedAt: new Date().toISOString(),
    }));

    return Conversation.from({
      id: plainChannel.id,
      type: 'CHANNEL',
      name: plainChannel.name,
      description: plainChannel.description,
      members,
      createdAt: plainChannel.createdAt,
      updatedAt: plainChannel.updatedAt,
      lastMessage: messages[0]?.toObject(),
      unreadCount: 0,
    });
  });

  const dmConversations = directMessages.map((dm) => {
    const plainDm = dm.toObject();
    const members: ConversationMember[] = plainDm.participantIds.map((id) => ({
      userId: id,
      role: 'member',
      joinedAt: new Date().toISOString(),
    }));

    return Conversation.from({
      id: plainDm.id,
      type: 'DM',
      members,
      createdAt: plainDm.createdAt,
      updatedAt: plainDm.updatedAt,
      lastMessage: messages[1]?.toObject(),
      unreadCount: 2,
    });
  });

  return [...channelConversations, ...dmConversations];
}

export function createMockConversation(overrides?: Partial<PlainConversation>): Conversation {
  const defaults = mockConversations()[0].toObject();
  return Conversation.from({ ...defaults, ...overrides });
}