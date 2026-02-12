import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { FriendRequest, createMockFriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { useIncomingFriendRequests } from './use-incoming-friend-requests.js';

describe('useIncomingFriendRequests', () => {
  it('should return friend requests from mock data', () => {
    const mockFriendRequests: FriendRequest[] = [
      createMockFriendRequest({ id: '1', toUserId: 'user1' }),
      createMockFriendRequest({ id: '2', toUserId: 'user1' }),
    ];

    const { result } = renderHook(() => useIncomingFriendRequests({ mockData: mockFriendRequests }), {
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
      createMockFriendRequest({ id: '1', toUserId: 'user1' }),
    ];

    const { result } = renderHook(() => useIncomingFriendRequests({ mockData: mockFriendRequests }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.loading).toBe(false);
  });
});