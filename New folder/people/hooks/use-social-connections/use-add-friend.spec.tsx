import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { useAddFriend } from './use-add-friend.js';

const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($toUserId: ID!) {
    peopleSendFriendRequest(options: { toUserId: $toUserId }) {
      id
      fromUserId
      toUserId
      status
      createdAt
    }
  }
`;

it('should call addFriend and return a SocialConnection', async () => {
  const mockResponse = {
    data: {
      peopleSendFriendRequest: {
        id: '123',
        fromUserId: 'user1',
        toUserId: 'user2',
        status: 'pending',
        createdAt: '2024-01-01T00:00:00.000Z',
        __typename: 'SocialConnection',
      },
    },
  };

  const mocks = [
    {
      request: {
        query: SEND_FRIEND_REQUEST,
        variables: { toUserId: 'user2' },
      },
      result: mockResponse,
    },
  ];

  const { result } = renderHook(() => useAddFriend(), {
    wrapper: ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    ),
  });

  let connection = null;
  await act(async () => {
    const addFriendResult = await result.current.addFriend('user2');
    connection = addFriendResult;
  });

  expect(connection?.toObject()).toEqual({
    id: '123',
    userId1: 'user1',
    userId2: 'user2',
    status: 'pending',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: undefined,
  });
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});