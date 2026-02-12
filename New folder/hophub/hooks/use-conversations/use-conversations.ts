import { useConversationsQuery, UseConversationsQueryOptions } from './use-conversations-query.js';

export type UseConversationsOptions = UseConversationsQueryOptions;

/**
 * A hook to list all conversations for the user.
 * Ordered by last activity (updatedAt or createdAt).
 */
export function useConversations(options?: UseConversationsOptions) {
  const { conversations, loading, error, refetch } = useConversationsQuery(options);

  const sortedConversations = [...conversations].sort((a, b) => {
    const plainA = a.toObject();
    const plainB = b.toObject();

    const dateA = new Date(plainA.updatedAt || plainA.createdAt).getTime();
    const dateB = new Date(plainB.updatedAt || plainB.createdAt).getTime();
    
    return dateB - dateA;
  });

  return {
    conversations: sortedConversations,
    loading,
    error,
    refetch
  };
}