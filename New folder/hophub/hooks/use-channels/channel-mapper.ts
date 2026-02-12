import { Channel, type PlainChannel } from '@cloudrabbit/hophub.entities.channel';

export type GqlConversationMember = {
  userId: string;
  role: 'admin' | 'member';
};

export type GqlConversation = {
  id: string;
  name?: string;
  description?: string;
  members?: GqlConversationMember[];
  createdAt: string;
  updatedAt?: string;
  type: 'DM' | 'GROUP' | 'CHANNEL';
};

/**
 * Maps a GraphQL conversation object to a Channel entity.
 */
export function mapToChannel(gqlConv: GqlConversation): Channel {
  const owner = gqlConv.members?.find((m) => m.role === 'admin');
  const memberIds = gqlConv.members?.map((m) => m.userId) || [];

  const plain: PlainChannel = {
    id: gqlConv.id,
    name: gqlConv.name || 'Unnamed Channel',
    description: gqlConv.description || '',
    type: 'public',
    ownerId: owner?.userId || memberIds[0] || 'unknown',
    memberIds,
    createdAt: gqlConv.createdAt,
    updatedAt: gqlConv.updatedAt,
  };

  return Channel.from(plain);
}