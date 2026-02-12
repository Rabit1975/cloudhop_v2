import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { FriendRequest } from '@cloudrabbit/people.entities.friend-request';
import { useSendFriendRequest } from './use-send-friend-request.js';

const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation SendFriendRequest($options: PeopleSendFriendRequestOptions!) {
    peopleSendFriendRequest(options: $options) {
      id
      fromUserId
      toUserId
      status
      createdAt
    }
  }
`;

describe('useSendFriendRequest', () => {
  it('should call the sendFriendRequest mutation', async () => {
    const mockSendFriendRequest = {
      id: 'req_123',
      fromUserId: 'user_abc',
      toUserId: 'user_xyz',
      status: 'pending',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    const mocks = [
      {
        request: {
          query: SEND_FRIEND_REQUEST_MUTATION,
          variables: { options: { toUserId: 'user_xyz' } },
        },
        result: {
          data: { peopleSendFriendRequest: mockSendFriendRequest },
        },
      },
    ];

    const { result } = renderHook(() => useSendFriendRequest(), {
      wrapper: ({ children }) => (
        <MockProvider>
          <MockedProvider mocks={mocks} addTypename={false}>
            {children}
          </MockedProvider>
        </MockProvider>
      ),
    });

    let friendRequest: FriendRequest | undefined;
    await act(async () => {
      friendRequest = await result.current.sendFriendRequest('user_xyz');
    });

    expect(friendRequest?.id).toBe('req_123');
  });
});