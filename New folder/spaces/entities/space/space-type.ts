import { SpaceVisibility } from './space-visibility-type.js';

export type PlainSpace = {
  /**
   * Unique identifier of the space.
   */
  id: string;

  /**
   * Name of the space.
   */
  name: string;

  /**
   * Description of the space.
   */
  description?: string;

  /**
   * ID of the user who owns the space.
   */
  ownerId: string;

  /**
   * Array of user IDs who are members of the space.
   */
  members: string[];

  /**
   * Visibility setting of the space.
   */
  visibility: SpaceVisibility;

  /**
   * ISO timestamp of when the space was created.
   */
  createdAt: string;

  /**
   * ISO timestamp of when the space was last updated.
   */
  updatedAt?: string;
};