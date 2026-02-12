import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { useRemoveFriend } from './use-remove-friend.js';

const REMOVE_FRIEND = gql`
  mutation RemoveFriend($friendUserId: ID!) {
    peopleRemoveFriend(options: { friendUserId: $friendUserId })
  }
`;

it('should call removeFriend and return true on success', async () => {
  const mockResponse = {
    data: {
      peopleRemoveFriend: true,
    },
  };

  const mocks = [
    {
      request: {
        query: REMOVE_FRIEND,
        variables: { friendUserId: 'user2' },
      },
      result: mockResponse,
    },
  ];

  const { result } = renderHook(() => useRemoveFriend(), {
    wrapper: ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    ),
  });

  let success = false;
  await act(async () => {
    success = await result.current.removeFriend('user2');
  });

  expect(success).toBe(true);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeUndefined();
});

it('should handle errors when removeFriend fails', async () => {
  const mocks = [
    {
      request: {
        query: REMOVE_FRIEND,
        variables: { friendUserId: 'user2' },
      },
      error: new Error('Failed to remove friend'),
    },
  ];

  const { result } = renderHook(() => useRemoveFriend(), {
    wrapper: ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    ),
  });

  let error: any;
  await act(async () => {
    try {
      await result.current.removeFriend('user2');
    } catch (e: any) {
      error = e;
    }
  });

  expect(error).toBeInstanceOf(Error);
  expect(result.current.loading).toBe(false);
});