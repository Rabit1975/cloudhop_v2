import { useQuery, gql } from '@apollo/client';
import { Notification, type PlainNotification } from '@cloudrabbit/hophub.entities.notification';

export const LIST_NOTIFICATIONS_QUERY = gql`
  query ListNotifications {
    hophubListNotifications {
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

export type UseNotificationsOptions = {
  /**
   * mock data to return instead of fetching.
   */
  mockData?: Notification[];

  /**
   * skip the query.
   */
  skip?: boolean;
};

export type UseNotificationsResult = {
  /**
   * The list of notifications.
   */
  notifications: Notification[];

  /**
   * Whether the query is loading.
   */
  loading: boolean;

  /**
   * Any error that occurred.
   */
  error?: Error;

  /**
   * Refetch the notifications.
   */
  refetch: () => Promise<any>;
};

/**
 * A React Hook for fetching a user's notifications.
 */
export function useNotifications({ mockData, skip }: UseNotificationsOptions = {}): UseNotificationsResult {
  const shouldSkip = skip || !!mockData;
  const { data, loading, error, refetch } = useQuery(LIST_NOTIFICATIONS_QUERY, {
    skip: shouldSkip,
  });

  const notifications = mockData || (data?.hophubListNotifications
    ? data.hophubListNotifications.map((n: PlainNotification) => Notification.from(n))
    : []);

  return {
    notifications,
    loading: loading && !mockData,
    error,
    refetch,
  };
}