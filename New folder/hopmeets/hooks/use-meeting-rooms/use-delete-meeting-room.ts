import { useMutation, gql } from '@apollo/client';

export const DELETE_MEETING_ROOM = gql`
  mutation DeleteMeetingRoom($meetingId: ID!) {
    hopmeetsDeleteMeeting(options: { meetingId: $meetingId })
  }
`;

export type DeleteMeetingRoomResult = {
  /**
   * Function to trigger the deletion.
   */
  deleteMeetingRoom: (meetingId: string) => Promise<boolean>;
  
  /**
   * Loading state.
   */
  loading: boolean;
  
  /**
   * Error object if any.
   */
  error?: Error;
  
  /**
   * Success status.
   */
  success: boolean;
};

/**
 * Hook to delete a meeting room.
 */
export function useDeleteMeetingRoom(): DeleteMeetingRoomResult {
  const [mutate, { loading, error, data }] = useMutation<{ hopmeetsDeleteMeeting: boolean }>(
    DELETE_MEETING_ROOM
  );

  const deleteMeetingRoom = async (meetingId: string) => {
    const result = await mutate({
      variables: {
        meetingId,
      },
    });

    return Boolean(result.data?.hopmeetsDeleteMeeting);
  };

  return {
    deleteMeetingRoom,
    loading,
    error,
    success: Boolean(data?.hopmeetsDeleteMeeting),
  };
}