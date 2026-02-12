import { SocialConnection } from '@cloudrabbit/people.entities.social-connection';
import type { UserPresenceStatus } from '@cloudrabbit/people.entities.presence-status';
import type { PlainUserProfile } from './user-profile-type.js';

export class UserProfile {
  constructor(
    /**
     * Unique identifier of the user profile.
     */
    readonly id: string,

    /**
     * ID of the user associated with this profile.
     */
    readonly userId: string,

    /**
     * First name of the user.
     */
    readonly firstName: string,

    /**
     * Last name of the user.
     */
    readonly lastName: string,

    /**
     * Email address of the user.
     */
    readonly email: string,

    /**
     * URL to the user's profile picture.
     */
    readonly profilePicture: string | undefined,

    /**
     * User's status message.
     */
    readonly statusMessage: string | undefined,

    /**
     * Current presence status of the user.
     */
    readonly presenceStatus: UserPresenceStatus,

    /**
     * List of social connections for the user.
     */
    readonly socialConnections: SocialConnection[],

    /**
     * Timestamp when the profile was created.
     */
    readonly createdAt: string,

    /**
     * Timestamp when the profile was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serializes the UserProfile into a plain object.
   */
  toObject(): PlainUserProfile {
    return {
      id: this.id,
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      profilePicture: this.profilePicture,
      statusMessage: this.statusMessage,
      presenceStatus: this.presenceStatus,
      socialConnections: this.socialConnections.map((connection) => connection.toObject()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a UserProfile instance from a plain object.
   */
  static from(plain: PlainUserProfile): UserProfile {
    return new UserProfile(
      plain.id,
      plain.userId,
      plain.firstName,
      plain.lastName,
      plain.email,
      plain.profilePicture,
      plain.statusMessage,
      plain.presenceStatus,
      plain.socialConnections.map((connection) => SocialConnection.from(connection)),
      plain.createdAt,
      plain.updatedAt
    );
  }
}