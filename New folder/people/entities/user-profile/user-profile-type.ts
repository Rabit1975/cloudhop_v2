import type { PlainSocialConnection } from '@cloudrabbit/people.entities.social-connection';
import type { UserPresenceStatus } from '@cloudrabbit/people.entities.presence-status';

export type PlainUserProfile = {
  /**
   * Unique identifier of the user profile.
   */
  id: string;

  /**
   * ID of the user associated with this profile.
   */
  userId: string;

  /**
   * First name of the user.
   */
  firstName: string;

  /**
   * Last name of the user.
   */
  lastName: string;

  /**
   * Email address of the user.
   */
  email: string;

  /**
   * URL to the user's profile picture.
   */
  profilePicture?: string;

  /**
   * User's status message.
   */
  statusMessage?: string;

  /**
   * Current presence status of the user.
   */
  presenceStatus: UserPresenceStatus;

  /**
   * List of social connections for the user.
   */
  socialConnections: PlainSocialConnection[];

  /**
   * Timestamp when the profile was created.
   */
  createdAt: string;

  /**
   * Timestamp when the profile was last updated.
   */
  updatedAt?: string;
};