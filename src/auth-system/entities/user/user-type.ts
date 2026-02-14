import { UserRole } from './role-type.js';

export type PlainUser = {
  /**
   * The unique identifier of the user.
   */
  id: string;

  /**
   * Alias for the user's unique identifier.
   */
  userId?: string;

  /**
   * The unique username of the user.
   */
  username: string;

  /**
   * The display name of the user.
   */
  displayName: string;

  /**
   * The email address of the user.
   */
  email: string;

  /**
   * The list of roles assigned to the user.
   */
  roles: UserRole[];

  /**
   * The URL of the user's profile image.
   */
  imageUrl?: string;
};