import { PlainPresenceStatus } from './plain-presence-status-type.js';
import { UserPresenceStatus } from './user-presence-status-type.js';

export class PresenceStatus {
  constructor(
    /**
     * The unique identifier of the user.
     */
    readonly userId: string,

    /**
     * The current presence status of the user.
     */
    readonly status: UserPresenceStatus,

    /**
     * The timestamp when the user was last seen.
     */
    readonly lastSeenAt: string
  ) {}

  /**
   * Virtual unique identifier for the presence entity.
   * Maps to userId as presence is unique per user.
   */
  get id() {
    return this.userId;
  }

  /**
   * Serializes the PresenceStatus entity into a plain object.
   */
  toObject(): PlainPresenceStatus {
    return {
      userId: this.userId,
      status: this.status,
      lastSeenAt: this.lastSeenAt,
    };
  }

  /**
   * Creates a PresenceStatus entity from a plain object.
   */
  static from(plain: PlainPresenceStatus) {
    return new PresenceStatus(
      plain.userId,
      plain.status,
      plain.lastSeenAt
    );
  }
}