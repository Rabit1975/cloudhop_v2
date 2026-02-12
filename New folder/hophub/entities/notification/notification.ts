import { PlainNotification, NotificationType } from './notification-type.js';

export class Notification {
  constructor(
    /**
     * Unique identifier for the notification.
     */
    readonly id: string,

    /**
     * ID of the user who received the notification.
     */
    readonly userId: string,

    /**
     * Type of the notification.
     */
    readonly type: NotificationType,

    /**
     * The content message of the notification.
     */
    readonly message: string,

    /**
     * Whether the notification has been read.
     */
    readonly read: boolean,

    /**
     * ISO timestamp of when the notification was created.
     */
    readonly timestamp: string,

    /**
     * Associated link for the notification action.
     */
    readonly link?: string
  ) {}

  /**
   * Serialize the Notification entity into a plain object.
   */
  toObject(): PlainNotification {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      message: this.message,
      link: this.link,
      read: this.read,
      timestamp: this.timestamp,
    };
  }

  /**
   * Create a Notification entity from a plain object.
   */
  static from(plainNotification: PlainNotification): Notification {
    return new Notification(
      plainNotification.id,
      plainNotification.userId,
      plainNotification.type,
      plainNotification.message,
      plainNotification.read,
      plainNotification.timestamp,
      plainNotification.link
    );
  }
}