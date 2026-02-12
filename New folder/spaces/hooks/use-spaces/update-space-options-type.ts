import { SpaceVisibility } from '@cloudrabbit/spaces.entities.space';

export type UpdateSpaceOptions = {
  /**
   * Unique identifier of the space to update.
   */
  spaceId: string;

  /**
   * New name for the space.
   */
  name?: string;

  /**
   * New description for the space.
   */
  description?: string;

  /**
   * New visibility setting for the space.
   */
  visibility?: SpaceVisibility;
};