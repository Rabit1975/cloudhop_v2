export type NotificationType = 'new_message' | 'channel_invite' | 'system_alert' | 'mention';

export type PlainNotification = {
  /**
   * Unique identifier for the notification.
   */
  id: string;

  /**
   * ID of the user who received the notification.
   */
  userId: string;

  /**
   * Type of the notification.
   */
  type: NotificationType;

  /**
   * The content message of the notification.
   */
  message: string;

  /**
   * Associated link for the notification action.
   */
  link?: string;

  /**
   * Whether the notification has been read.
   */
  read: boolean;

  /**
   * ISO timestamp of when the notification was created.
   */
  timestamp: string;
};