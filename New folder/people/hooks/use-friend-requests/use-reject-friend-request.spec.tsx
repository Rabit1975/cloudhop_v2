import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { useRejectFriendRequest } from './use-reject-friend-request.js';

const REJECT_FRIEND_REQUEST_MUTATION = gql`
  mutation RejectFriendRequest($options: PeopleRejectFriendRequestOptions!) {
    peopleRejectFriendRequest(options: $options)
  }
`;

describe('useRejectFriendRequest', () => {
  it('should call the rejectFriendRequest mutation', async () => {
    const mocks = [
      {
        request: {
          query: REJECT_FRIEND_REQUEST_MUTATION,
          variables: { options: { requestId: 'req_123' } },
        },
        result: {
          data: { peopleRejectFriendRequest: true },
        },
      },
    ];

    const { result } = renderHook(() => useRejectFriendRequest(), {
      wrapper: ({ children }) => (
        <MockProvider>
          <MockedProvider mocks={mocks} addTypename={false}>
            {children}
          </MockedProvider>
        </MockProvider>
      ),
    });

    let rejected: boolean = false;
    await act(async () => {
      rejected = await result.current.rejectFriendRequest('req_123');
    });

    expect(rejected).toBe(true);
  });
});