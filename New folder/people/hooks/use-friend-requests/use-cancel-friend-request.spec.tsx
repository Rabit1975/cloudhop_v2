import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { useCancelFriendRequest } from './use-cancel-friend-request.js';

const CANCEL_FRIEND_REQUEST_MUTATION = gql`
  mutation CancelFriendRequest($options: PeopleRejectFriendRequestOptions!) {
    peopleRejectFriendRequest(options: $options)
  }
`;

describe('useCancelFriendRequest', () => {
  it('should call the cancelFriendRequest mutation', async () => {
    const mocks = [
      {
        request: {
          query: CANCEL_FRIEND_REQUEST_MUTATION,
          variables: { options: { requestId: 'req_123' } },
        },
        result: {
          data: { peopleRejectFriendRequest: true },
        },
      },
    ];

    const { result } = renderHook(() => useCancelFriendRequest(), {
      wrapper: ({ children }) => (
        <MockProvider>
          <MockedProvider mocks={mocks} addTypename={false}>
            {children}
          </MockedProvider>
        </MockProvider>
      ),
    });

    let cancelled: boolean = false;
    await act(async () => {
      cancelled = await result.current.cancelFriendRequest('req_123');
    });

    expect(cancelled).toBe(true);
  });
});