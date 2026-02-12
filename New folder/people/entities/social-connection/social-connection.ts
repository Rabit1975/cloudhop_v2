import { PlainSocialConnection, SocialConnectionStatus } from './social-connection-type.js';

export class SocialConnection {
  /**
   * Creates a SocialConnection instance.
   * @param id Unique identifier.
   * @param userId1 ID of the first user.
   * @param userId2 ID of the second user.
   * @param status Connection status.
   * @param createdAt Creation timestamp.
   * @param updatedAt Update timestamp.
   */
  constructor(
    readonly id: string,
    readonly userId1: string,
    readonly userId2: string,
    readonly status: SocialConnectionStatus,
    readonly createdAt: string,
    readonly updatedAt?: string
  ) {}

  /**
   * Serialize the SocialConnection into a plain object.
   */
  toObject(): PlainSocialConnection {
    return {
      id: this.id,
      userId1: this.userId1,
      userId2: this.userId2,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Create a SocialConnection object from a plain object.
   */
  static from(plain: PlainSocialConnection): SocialConnection {
    return new SocialConnection(
      plain.id,
      plain.userId1,
      plain.userId2,
      plain.status,
      plain.createdAt,
      plain.updatedAt
    );
  }
}