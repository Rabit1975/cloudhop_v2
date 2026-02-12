import { useQuery, gql } from '@apollo/client';
import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import { adaptToMeetingRoom, HopmeetsMeetingGraphql } from './meeting-room-adapter.js';

export const GET_MEETING_ROOM = gql`
  query GetMeetingRoom($meetingId: ID!) {
    hopmeetsGetMeeting(options: { meetingId: $meetingId }) {
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

export type UseMeetingRoomOptions = {
  /**
   * Skip the query.
   */
  skip?: boolean;
  
  /**
   * Provide mock data for testing or preview.
   */
  mockData?: MeetingRoom;
};

export type UseMeetingRoomResult = {
  /**
   * The requested meeting room.
   */
  meetingRoom?: MeetingRoom;
  
  /**
   * Loading state.
   */
  loading: boolean;
  
  /**
   * Error object if any.
   */
  error?: Error;
  
  /**
   * Function to refetch the data.
   */
  refetch: () => void;
};

/**
 * Hook to fetch a single meeting room by ID.
 * Adapts the underlying HopmeetsMeeting data to a MeetingRoom entity.
 */
export function useMeetingRoom(meetingId: string, options?: UseMeetingRoomOptions): UseMeetingRoomResult {
  const skip = options?.skip || !!options?.mockData;
  
  const { data, loading, error, refetch } = useQuery<{ hopmeetsGetMeeting: HopmeetsMeetingGraphql }>(
    GET_MEETING_ROOM,
    {
      variables: { meetingId },
      skip,
    }
  );

  if (options?.mockData) {
    return {
      meetingRoom: options.mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const meetingRoom = data?.hopmeetsGetMeeting 
    ? adaptToMeetingRoom(data.hopmeetsGetMeeting) 
    : undefined;

  return {
    meetingRoom,
    loading,
    error,
    refetch,
  };
}