export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export type PlainFriendRequest = {
  /**
   * Unique identifier for the friend request.
   */
  id: string;

  /**
   * ID of the user sending the request.
   */
  fromUserId: string;

  /**
   * ID of the user receiving the request.
   */
  toUserId: string;

  /**
   * Current status of the request.
   */
  status: FriendRequestStatus;

  /**
   * ISO timestamp when the request was sent.
   */
  createdAt: string;
};