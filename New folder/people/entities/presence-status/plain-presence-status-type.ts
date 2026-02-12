import { UserPresenceStatus } from './user-presence-status-type.js';

export type PlainPresenceStatus = {
  /**
   * The unique identifier of the user.
   */
  userId: string;

  /**
   * The current presence status of the user.
   */
  status: UserPresenceStatus;

  /**
   * The timestamp when the user was last seen.
   */
  lastSeenAt: string;
};