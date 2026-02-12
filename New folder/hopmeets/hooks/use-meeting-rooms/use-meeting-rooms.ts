import { useQuery, gql } from '@apollo/client';
import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import { adaptToMeetingRoom, HopmeetsMeetingGraphql } from './meeting-room-adapter.js';

export const LIST_MEETING_ROOMS = gql`
  query ListMeetingRooms($limit: Int, $offset: Int, $status: HopmeetsMeetingStatus) {
    hopmeetsListMeetings(options: { limit: $limit, offset: $offset, status: $status }) {
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

export type UseMeetingRoomsOptions = {
  /**
   * Number of items to fetch.
   */
  limit?: number;
  
  /**
   * Number of items to skip.
   */
  offset?: number;
  
  /**
   * Filter by meeting status.
   */
  status?: 'scheduled' | 'live' | 'ended' | 'canceled';
  
  /**
   * Skip the query.
   */
  skip?: boolean;

  /**
   * Provide mock data for testing or preview.
   */
  mockData?: MeetingRoom[];
};

export type UseMeetingRoomsResult = {
  /**
   * List of meeting rooms.
   */
  meetingRooms: MeetingRoom[];
  
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
 * Hook to list meeting rooms.
 * Fetches meetings and adapts them to MeetingRoom entities.
 */
export function useMeetingRooms(options?: UseMeetingRoomsOptions): UseMeetingRoomsResult {
  const skip = options?.skip || !!options?.mockData;
  
  const { data, loading, error, refetch } = useQuery<{ hopmeetsListMeetings: HopmeetsMeetingGraphql[] }>(
    LIST_MEETING_ROOMS,
    {
      variables: {
        limit: options?.limit,
        offset: options?.offset,
        status: options?.status,
      },
      skip,
    }
  );

  if (options?.mockData) {
    return {
      meetingRooms: options.mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const meetingRooms = data?.hopmeetsListMeetings?.map(adaptToMeetingRoom) || [];

  return {
    meetingRooms,
    loading,
    error,
    refetch,
  };
}