import { SpaceVisibility } from '@cloudrabbit/spaces.entities.space';

export type CreateSpaceOptions = {
  /**
   * Name of the space.
   */
  name: string;

  /**
   * Description of the space.
   */
  description?: string;

  /**
   * Visibility setting of the space.
   */
  visibility?: SpaceVisibility;
};