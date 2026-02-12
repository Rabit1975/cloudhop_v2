/**
 * Represents the status of a social connection.
 */
export type SocialConnectionStatus = 'pending' | 'accepted' | 'blocked';

/**
 * Plain object representation of a social connection.
 */
export type PlainSocialConnection = {
  /**
   * Unique identifier of the connection.
   */
  id: string;

  /**
   * ID of the first user in the connection.
   */
  userId1: string;

  /**
   * ID of the second user in the connection.
   */
  userId2: string;

  /**
   * Current status of the connection.
   */
  status: SocialConnectionStatus;

  /**
   * Timestamp when the connection was created.
   */
  createdAt: string;

  /**
   * Timestamp when the connection was last updated.
   */
  updatedAt?: string;
};