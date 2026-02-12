import { ChannelVisibility } from './channel-visibility-type.js';

export type PlainChannel = {
  /**
   * Unique identifier of the channel.
   */
  id: string;

  /**
   * Name of the channel.
   */
  name: string;

  /**
   * Description of the channel.
   */
  description: string;

  /**
   * Visibility type of the channel.
   */
  type: ChannelVisibility;

  /**
   * ID of the owner of the channel.
   */
  ownerId: string;

  /**
   * List of member IDs in the channel.
   */
  memberIds: string[];

  /**
   * ISO string of the creation date.
   */
  createdAt: string;

  /**
   * ISO string of the last update date.
   */
  updatedAt?: string;
};