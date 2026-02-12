import { useMutation, gql } from '@apollo/client';
import { Notification, type PlainNotification } from '@cloudrabbit/hophub.entities.notification';

export const MARK_NOTIFICATION_AS_READ_MUTATION = gql`
  mutation MarkNotificationAsRead($options: HophubMarkNotificationAsReadOptions!) {
    hophubMarkNotificationAsRead(options: $options) {
      id
      userId
      type
      message
      link
      read
      timestamp
    }
  }
`;

export type MarkNotificationAsReadOptions = {
  /**
   * The ID of the notification to mark as read.
   */
  notificationId: string;
};

export type UseMarkNotificationAsReadResult = {
  /**
   * Function to mark a notification as read.
   */
  markAsRead: (options: MarkNotificationAsReadOptions) => Promise<Notification | undefined>;

  /**
   * Whether the mutation is loading.
   */
  loading: boolean;

  /**
   * Any error that occurred.
   */
  error?: Error;

  /**
   * The updated notification.
   */
  data?: Notification;
};

/**
 * A React Hook for marking a notification as read.
 */
export function useMarkNotificationAsRead(): UseMarkNotificationAsReadResult {
  const [mutate, { data, loading, error }] = useMutation(MARK_NOTIFICATION_AS_READ_MUTATION);

  const markAsRead = async (options: MarkNotificationAsReadOptions) => {
    const result = await mutate({
      variables: {
        options,
      },
    });

    return result.data?.hophubMarkNotificationAsRead
      ? Notification.from(result.data.hophubMarkNotificationAsRead as PlainNotification)
      : undefined;
  };

  const notification = data?.hophubMarkNotificationAsRead
    ? Notification.from(data.hophubMarkNotificationAsRead as PlainNotification)
    : undefined;

  return {
    markAsRead,
    loading,
    error,
    data: notification,
  };
}