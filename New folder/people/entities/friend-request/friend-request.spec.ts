import { FriendRequest } from './friend-request.js';
import { mockFriendRequests } from './friend-request.mock.js';

describe('FriendRequest', () => {
  it('should create a FriendRequest instance from a plain object', () => {
    const plainRequest = mockFriendRequests[0];
    const friendRequest = FriendRequest.from(plainRequest);
    expect(friendRequest).toBeInstanceOf(FriendRequest);
  });

  it('should have a from() method', () => {
    expect(FriendRequest.from).toBeTruthy();
  });

  it('should serialize to plain object', () => {
    const plainRequest = mockFriendRequests[0];
    const friendRequest = FriendRequest.from(plainRequest);
    expect(friendRequest.toObject()).toEqual(plainRequest);
  });
});