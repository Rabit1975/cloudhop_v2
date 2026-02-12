import { gql, useMutation } from '@apollo/client';

export const DELETE_MEETING_MUTATION = gql`
  mutation DeleteMeeting($meetingId: ID!) {
    hopmeetsDeleteMeeting(options: { meetingId: $meetingId })
  }
`;

export type UseDeleteCalendarEventResult = {
  /**
   * Function to delete a calendar event. Returns true if successful.
   */
  deleteEvent: (meetingId: string) => Promise<boolean>;

  /**
   * Loading state.
   */
  loading: boolean;

  /**
   * Error object if deletion fails.
   */
  error?: Error;
};

/**
 * Hook to delete a calendar event (meeting).
 */
export function useDeleteCalendarEvent(): UseDeleteCalendarEventResult {
  const [mutate, { loading, error }] = useMutation(DELETE_MEETING_MUTATION);

  const deleteEvent = async (meetingId: string) => {
    const { data } = await mutate({
      variables: { meetingId },
    });

    return Boolean(data?.hopmeetsDeleteMeeting);
  };

  return {
    deleteEvent,
    loading,
    error,
  };
}