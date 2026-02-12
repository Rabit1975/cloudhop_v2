import { useMutation, gql } from '@apollo/client';
import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import { adaptToMeetingRoom, HopmeetsMeetingGraphql } from './meeting-room-adapter.js';
import { CreateMeetingRoomOptions } from './meeting-room-types.js';

export const CREATE_MEETING_ROOM = gql`
  mutation CreateMeetingRoom($topic: String!, $description: String, $startTime: String!, $endTime: String!, $accessCode: String) {
    hopmeetsCreateMeeting(options: { 
      topic: $topic, 
      description: $description, 
      startTime: $startTime, 
      endTime: $endTime, 
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

export type CreateMeetingRoomResult = {
  /**
   * Function to trigger the creation.
   */
  createMeetingRoom: (options: CreateMeetingRoomOptions) => Promise<MeetingRoom | undefined>;
  
  /**
   * Loading state.
   */
  loading: boolean;
  
  /**
   * Error object if any.
   */
  error?: Error;
  
  /**
   * The created meeting room data.
   */
  data?: MeetingRoom;
};

/**
 * Hook to create a new meeting room.
 * Maps 'MeetingRoom' concepts to the underlying 'HopmeetsMeeting' creation mutation.
 */
export function useCreateMeetingRoom(): CreateMeetingRoomResult {
  const [mutate, { loading, error, data }] = useMutation<{ hopmeetsCreateMeeting: HopmeetsMeetingGraphql }>(
    CREATE_MEETING_ROOM
  );

  const createMeetingRoom = async (options: CreateMeetingRoomOptions) => {
    // Defaulting start and end times since "Rooms" are persistent, but the schema requires times for "Meetings"
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const result = await mutate({
      variables: {
        topic: options.name,
        description: options.description,
        startTime: now.toISOString(),
        endTime: oneHourLater.toISOString(),
        accessCode: options.isPrivate ? 'PRIVATE' : undefined,
      },
    });

    return result.data?.hopmeetsCreateMeeting 
      ? adaptToMeetingRoom(result.data.hopmeetsCreateMeeting) 
      : undefined;
  };

  const createdRoom = data?.hopmeetsCreateMeeting 
    ? adaptToMeetingRoom(data.hopmeetsCreateMeeting) 
    : undefined;

  return {
    createMeetingRoom,
    loading,
    error,
    data: createdRoom,
  };
}