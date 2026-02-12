import { useQuery, gql } from '@apollo/client';
import { Conversation, ConversationType } from '@cloudrabbit/hophub.entities.conversation';

export const LIST_CONVERSATIONS_QUERY = gql`
  query HophubListConversations($options: HophubListConversationsOptions) {
    hophubListConversations(options: $options) {
      id
      type
      name
      description
      imageUrl
      createdAt
      updatedAt
      unreadCount
      lastMessage {
        id
        conversationId
        senderId
        text
        type
        createdAt
        updatedAt
        mediaAttachments {
          id
          url
          type
          filename
          size
        }
      }
      members {
        userId
        role
        joinedAt
        lastReadMessageId
      }
    }
  }
`;

export type UseConversationsQueryOptions = {
  memberId?: string;
  type?: ConversationType;
  limit?: number;
  offset?: number;
  mockData?: Conversation[];
  skip?: boolean;
};

export type ConversationsQueryValue = {
  conversations: Conversation[];
  loading: boolean;
  error?: Error;
  refetch: (variables?: any) => Promise<any>;
};

export function useConversationsQuery({ mockData, skip, ...options }: UseConversationsQueryOptions = {}): ConversationsQueryValue {
  const { data, loading, error, refetch } = useQuery(LIST_CONVERSATIONS_QUERY, {
    variables: {
      options: Object.keys(options).length > 0 ? options : undefined
    },
    skip: skip || !!mockData
  });

  const conversations = mockData || (data?.hophubListConversations
    ? data.hophubListConversations.map((c: any) => Conversation.from(c))
    : []);

  return {
    conversations,
    loading: !!loading,
    error,
    refetch
  };
}