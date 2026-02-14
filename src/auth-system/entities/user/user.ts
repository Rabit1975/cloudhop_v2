import { PlainUser } from './user-type.js';
import { UserRole } from './role-type.js';

export class User {
  constructor(
    /**
     * The unique identifier of the user.
     */
    readonly id: string,

    /**
     * The unique username of the user.
     */
    readonly username: string,

    /**
     * The display name of the user.
     */
    readonly displayName: string,

    /**
     * The email address of the user.
     */
    readonly email: string,

    /**
     * The list of roles assigned to the user.
     */
    readonly roles: UserRole[] = [],

    /**
     * The URL of the user's profile image.
     */
    readonly imageUrl?: string
  ) {}

  /**
   * Alias for the user's unique identifier.
   */
  get userId(): string {
    return this.id;
  }

  /**
   * Checks if the user has a specific role.
   * @param role The role to check for.
   * @returns True if the user has the role, false otherwise.
   */
  hasRole(role: UserRole): boolean {
    return this.roles.includes(role);
  }

  /**
   * Serializes the User entity into a plain object.
   * @returns A plain object representation of the user.
   */
  toObject(): PlainUser {
    return {
      id: this.id,
      userId: this.userId,
      username: this.username,
      displayName: this.displayName,
      email: this.email,
      roles: this.roles,
      imageUrl: this.imageUrl,
    };
  }

  /**
   * Creates a User entity from a plain object.
   * @param plain The plain object to create the entity from.
   * @returns A new User entity.
   */
  static from(plain: PlainUser): User {
    return new User(
      plain.id,
      plain.username,
      plain.displayName,
      plain.email,
      plain.roles,
      plain.imageUrl
    );
  }
}