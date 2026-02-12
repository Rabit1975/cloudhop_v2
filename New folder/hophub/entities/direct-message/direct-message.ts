import { PlainDirectMessage } from './direct-message-type.js';

export class DirectMessage {
  constructor(
    /**
     * unique identifier of the direct message.
     */
    readonly id: string,

    /**
     * list of user ids participating in the direct message.
     */
    readonly participantIds: string[],

    /**
     * the date and time when the direct message was created.
     */
    readonly createdAt: string,

    /**
     * the date and time when the direct message was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * serialize the DirectMessage entity into a plain object.
   */
  toObject(): PlainDirectMessage {
    return {
      id: this.id,
      participantIds: this.participantIds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * create a DirectMessage entity from a plain object.
   */
  static from(plain: PlainDirectMessage): DirectMessage {
    const { id, participantIds = [], createdAt, updatedAt } = plain;
    return new DirectMessage(id, participantIds, createdAt, updatedAt);
  }
}