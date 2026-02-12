import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { createMockConversation } from '@cloudrabbit/hophub.entities.conversation';
import { useConversations } from './use-conversations.js';

describe('useConversations', () => {
  it('should return conversations sorted by last activity', () => {
    const conversation1 = createMockConversation({ id: '1', createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-01-02T00:00:00.000Z' });
    const conversation2 = createMockConversation({ id: '2', createdAt: '2024-01-03T00:00:00.000Z', updatedAt: undefined });
    const conversation3 = createMockConversation({ id: '3', createdAt: '2024-01-04T00:00:00.000Z', updatedAt: '2024-01-05T00:00:00.000Z' });

    const mockData = [conversation1, conversation2, conversation3];

    const { result } = renderHook(() => useConversations({ mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    const sortedIds = result.current.conversations.map((c) => c.toObject().id);
    expect(sortedIds).toEqual(['3', '2', '1']);
  });
});