import { PlainFriendRequest, FriendRequestStatus } from './friend-request-type.js';

export class FriendRequest {
  constructor(
    /**
     * Unique identifier for the friend request.
     */
    readonly id: string,

    /**
     * ID of the user sending the request.
     */
    readonly fromUserId: string,

    /**
     * ID of the user receiving the request.
     */
    readonly toUserId: string,

    /**
     * Current status of the request.
     */
    readonly status: FriendRequestStatus,

    /**
     * ISO timestamp when the request was sent.
     */
    readonly createdAt: string
  ) {}

  /**
   * Alias for fromUserId (sender of the request).
   */
  get senderId(): string {
    return this.fromUserId;
  }

  /**
   * Alias for toUserId (receiver of the request).
   */
  get receiverId(): string {
    return this.toUserId;
  }

  /**
   * Alias for createdAt (timestamp when sent).
   */
  get sentAt(): string {
    return this.createdAt;
  }

  /**
   * Serialize the FriendRequest entity into a plain object.
   */
  toObject(): PlainFriendRequest {
    return {
      id: this.id,
      fromUserId: this.fromUserId,
      toUserId: this.toUserId,
      status: this.status,
      createdAt: this.createdAt,
    };
  }

  /**
   * Create a FriendRequest entity from a plain object.
   */
  static from(plain: PlainFriendRequest): FriendRequest {
    const { id, fromUserId, toUserId, status, createdAt } = plain;
    return new FriendRequest(id, fromUserId, toUserId, status, createdAt);
  }
}