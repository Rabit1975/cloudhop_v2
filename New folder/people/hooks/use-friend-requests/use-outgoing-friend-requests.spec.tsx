import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { FriendRequest, createMockFriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { useOutgoingFriendRequests } from './use-outgoing-friend-requests.js';

describe('useOutgoingFriendRequests', () => {
  it('should return friend requests from mock data', () => {
    const mockFriendRequests: FriendRequest[] = [
      createMockFriendRequest({ id: '1', fromUserId: 'user1' }),
      createMockFriendRequest({ id: '2', fromUserId: 'user1' }),
    ];

    const { result } = renderHook(() => useOutgoingFriendRequests({ mockData: mockFriendRequests }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.friendRequests.length).toBe(2);
    expect(result.current.friendRequests[0].id).toBe('1');
  });

  it('should return loading as false when mock data is provided', () => {
    const mockFriendRequests: FriendRequest[] = [
      createMockFriendRequest({ id: '1', fromUserId: 'user1' }),
    ];

    const { result } = renderHook(() => useOutgoingFriendRequests({ mockData: mockFriendRequests }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.loading).toBe(false);
  });
});