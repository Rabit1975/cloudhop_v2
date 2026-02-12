import { useMutation, gql, type Reference } from '@apollo/client';

export const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DeleteNotification($options: HophubDeleteNotificationOptions!) {
    hophubDeleteNotification(options: $options)
  }
`;

export type DeleteNotificationOptions = {
  /**
   * The ID of the notification to delete.
   */
  notificationId: string;
};

export type UseDeleteNotificationResult = {
  /**
   * Function to delete a notification.
   */
  deleteNotification: (options: DeleteNotificationOptions) => Promise<boolean>;

  /**
   * Whether the mutation is loading.
   */
  loading: boolean;

  /**
   * Any error that occurred.
   */
  error?: Error;
};

/**
 * A React Hook for deleting a notification.
 */
export function useDeleteNotification(): UseDeleteNotificationResult {
  const [mutate, { loading, error }] = useMutation(DELETE_NOTIFICATION_MUTATION);

  const deleteNotification = async (options: DeleteNotificationOptions) => {
    const result = await mutate({
      variables: {
        options,
      },
      update(cache) {
        cache.modify({
          fields: {
            hophubListNotifications(existingRefs: Reference[] = [], { readField }) {
              return existingRefs.filter(
                (ref: Reference) => readField('id', ref) !== options.notificationId
              );
            },
          },
        });
      },
    });

    return Boolean(result.data?.hophubDeleteNotification);
  };

  return {
    deleteNotification,
    loading,
    error,
  };
}