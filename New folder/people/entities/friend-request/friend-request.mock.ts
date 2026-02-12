import { FriendRequest } from './friend-request.js';
import { PlainFriendRequest } from './friend-request-type.js';

export const mockFriendRequests: PlainFriendRequest[] = [
  {
    id: 'req_12345',
    fromUserId: 'user_001',
    toUserId: 'user_002',
    status: 'pending',
    createdAt: '2023-10-25T10:00:00Z',
  },
  {
    id: 'req_67890',
    fromUserId: 'user_003',
    toUserId: 'user_001',
    status: 'accepted',
    createdAt: '2023-10-24T14:30:00Z',
  },
  {
    id: 'req_54321',
    fromUserId: 'user_004',
    toUserId: 'user_001',
    status: 'rejected',
    createdAt: '2023-10-23T09:15:00Z',
  },
];

export function createMockFriendRequest(
  overrides?: Partial<PlainFriendRequest>
): FriendRequest {
  const defaultRequest: PlainFriendRequest = {
    id: 'req_mock_default',
    fromUserId: 'user_mock_sender',
    toUserId: 'user_mock_receiver',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  return FriendRequest.from({ ...defaultRequest, ...overrides });
}