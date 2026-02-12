import { useMutation, gql } from '@apollo/client';
import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import { adaptToMeetingRoom, HopmeetsMeetingGraphql } from './meeting-room-adapter.js';
import { UpdateMeetingRoomOptions } from './meeting-room-types.js';

export const UPDATE_MEETING_ROOM = gql`
  mutation UpdateMeetingRoom($meetingId: ID!, $topic: String, $description: String, $accessCode: String) {
    hopmeetsUpdateMeeting(options: { 
      meetingId: $meetingId, 
      topic: $topic, 
      description: $description, 
      accessCode: $accessCode 
    }) {
      id
      topic
      description
      startTime
      endTime
      hostId
      status
      accessCode
      joinUrl
      createdAt
      updatedAt
    }
  }
`;

export type UpdateMeetingRoomResult = {
  /**
   * Function to trigger the update.
   */
  updateMeetingRoom: (options: UpdateMeetingRoomOptions) => Promise<MeetingRoom | undefined>;
  
  /**
   * Loading state.
   */
  loading: boolean;
  
  /**
   * Error object if any.
   */
  error?: Error;
  
  /**
   * The updated meeting room data.
   */
  data?: MeetingRoom;
};

/**
 * Hook to update an existing meeting room.
 */
export function useUpdateMeetingRoom(): UpdateMeetingRoomResult {
  const [mutate, { loading, error, data }] = useMutation<{ hopmeetsUpdateMeeting: HopmeetsMeetingGraphql }>(
    UPDATE_MEETING_ROOM
  );

  const updateMeetingRoom = async (options: UpdateMeetingRoomOptions) => {
    const result = await mutate({
      variables: {
        meetingId: options.id,
        topic: options.name,
        description: options.description,
        accessCode: options.isPrivate === undefined ? undefined : (options.isPrivate ? 'PRIVATE' : ''),
      },
    });

    return result.data?.hopmeetsUpdateMeeting 
      ? adaptToMeetingRoom(result.data.hopmeetsUpdateMeeting) 
      : undefined;
  };

  const updatedRoom = data?.hopmeetsUpdateMeeting 
    ? adaptToMeetingRoom(data.hopmeetsUpdateMeeting) 
    : undefined;

  return {
    updateMeetingRoom,
    loading,
    error,
    data: updatedRoom,
  };
}