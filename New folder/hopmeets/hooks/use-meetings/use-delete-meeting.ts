import { useMutation, gql } from '@apollo/client';
import { DeleteMeetingOptions } from './delete-meeting-options-type.js';

const DELETE_MEETING_MUTATION = gql`
  mutation DeleteMeeting($options: HopmeetsDeleteMeetingOptions!) {
    hopmeetsDeleteMeeting(options: $options)
  }
`;

export type DeleteMeetingResult = {
  /**
   * Whether the deletion was successful.
   */
  success?: boolean;

  /**
   * Whether the mutation is currently executing.
   */
  loading: boolean;

  /**
   * Error message if the mutation failed.
   */
  error?: string;
};

/**
 * Hook to delete a meeting.
 * @returns A function to execute the deletion and the current state.
 */
export function useDeleteMeeting(): [
  (options: DeleteMeetingOptions) => Promise<boolean>,
  DeleteMeetingResult
] {
  const [mutate, { data, loading, error }] = useMutation(DELETE_MEETING_MUTATION);

  const deleteMeeting = async (options: DeleteMeetingOptions) => {
    try {
      const result = await mutate({
        variables: { options },
      });
      return Boolean(result.data?.hopmeetsDeleteMeeting);
    } catch (e) {
      console.error('Failed to delete meeting:', e);
      throw e;
    }
  };

  return [
    deleteMeeting,
    {
      success: data?.hopmeetsDeleteMeeting,
      loading,
      error: error?.message,
    },
  ];
}