import { PlainChannel } from './channel-type.js';
import { ChannelVisibility } from './channel-visibility-type.js';

export class Channel {
  constructor(
    /**
     * Unique identifier of the channel.
     */
    readonly id: string,

    /**
     * Name of the channel.
     */
    readonly name: string,

    /**
     * Description of the channel.
     */
    readonly description: string,

    /**
     * Visibility type of the channel.
     */
    readonly type: ChannelVisibility,

    /**
     * ID of the owner of the channel.
     */
    readonly ownerId: string,

    /**
     * List of member IDs in the channel.
     */
    readonly memberIds: string[],

    /**
     * ISO string of the creation date.
     */
    readonly createdAt: string,

    /**
     * ISO string of the last update date.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serializes the Channel entity to a plain object.
   */
  toObject(): PlainChannel {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      ownerId: this.ownerId,
      memberIds: this.memberIds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a Channel entity from a plain object.
   */
  static from(plainChannel: PlainChannel): Channel {
    return new Channel(
      plainChannel.id,
      plainChannel.name,
      plainChannel.description,
      plainChannel.type,
      plainChannel.ownerId,
      plainChannel.memberIds,
      plainChannel.createdAt,
      plainChannel.updatedAt
    );
  }
}