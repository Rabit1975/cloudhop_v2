import { PlainSpace } from './space-type.js';
import { SpaceVisibility } from './space-visibility-type.js';

export class Space {
  constructor(
    /**
     * Unique identifier of the space.
     */
    readonly id: string,

    /**
     * Name of the space.
     */
    readonly name: string,

    /**
     * ID of the user who owns the space.
     */
    readonly ownerId: string,

    /**
     * Array of user IDs who are members of the space.
     */
    readonly members: string[],

    /**
     * Visibility setting of the space.
     */
    readonly visibility: SpaceVisibility,

    /**
     * ISO timestamp of when the space was created.
     */
    readonly createdAt: string,

    /**
     * Description of the space.
     */
    readonly description?: string,

    /**
     * ISO timestamp of when the space was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serializes the Space entity into a plain object.
   */
  toObject(): PlainSpace {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ownerId: this.ownerId,
      members: this.members,
      visibility: this.visibility,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a Space entity from a plain object.
   */
  static from(plain: PlainSpace): Space {
    return new Space(
      plain.id,
      plain.name,
      plain.ownerId,
      plain.members || [],
      plain.visibility,
      plain.createdAt,
      plain.description,
      plain.updatedAt
    );
  }
}