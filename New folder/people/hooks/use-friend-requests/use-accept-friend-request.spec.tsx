import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { useAcceptFriendRequest } from './use-accept-friend-request.js';

const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation AcceptFriendRequest($options: PeopleAcceptFriendRequestOptions!) {
    peopleAcceptFriendRequest(options: $options) {
      id
      userId1
      userId2
      createdAt
    }
  }
`;

describe('useAcceptFriendRequest', () => {
  it('should call the acceptFriendRequest mutation', async () => {
    const mockFriendship = {
      id: 'friendship_123',
      userId1: 'user_abc',
      userId2: 'user_xyz',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    const mocks = [
      {
        request: {
          query: ACCEPT_FRIEND_REQUEST_MUTATION,
          variables: { options: { requestId: 'req_123' } },
        },
        result: {
          data: { peopleAcceptFriendRequest: mockFriendship },
        },
      },
    ];

    const { result } = renderHook(() => useAcceptFriendRequest(), {
      wrapper: ({ children }) => (
        <MockProvider>
          <MockedProvider mocks={mocks} addTypename={false}>
            {children}
          </MockedProvider>
        </MockProvider>
      ),
    });

    await act(async () => {
      await result.current.acceptFriendRequest('req_123');
    });

    expect(result.current.loading).toBe(false);
  });
});