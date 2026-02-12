import { useQuery, gql } from '@apollo/client';
import { Meeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { GetMeetingOptions } from './get-meeting-options-type.js';

const GET_MEETING_QUERY = gql`
  query GetMeeting($options: HopmeetsGetMeetingOptions!) {
    hopmeetsGetMeeting(options: $options) {
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
      participants {
        userId
        role
        joinedAt
        leftAt
      }
    }
  }
`;

export type UseMeetingOptions = {
  /**
   * Options to fetch the meeting.
   */
  meetingOptions: GetMeetingOptions;

  /**
   * Provide mock data for testing or preview.
   */
  mockData?: Meeting;
};

export type UseMeetingResult = {
  /**
   * The fetched meeting entity.
   */
  meeting?: Meeting;

  /**
   * Whether the query is currently loading.
   */
  loading: boolean;

  /**
   * Error message if the query failed.
   */
  error?: string;

  /**
   * Function to refetch the data.
   */
  refetch: () => void;
};

/**
 * Hook to fetch a single meeting by ID.
 * @param options Configuration for fetching the meeting.
 * @returns The meeting data, loading state, and error information.
 */
export function useMeeting({ meetingOptions, mockData }: UseMeetingOptions): UseMeetingResult {
  const skip = Boolean(mockData);

  const { data, loading, error, refetch } = useQuery(GET_MEETING_QUERY, {
    variables: { options: meetingOptions },
    skip,
  });

  const meeting = mockData || (data?.hopmeetsGetMeeting ? Meeting.from(data.hopmeetsGetMeeting) : undefined);

  return {
    meeting,
    loading: skip ? false : loading,
    error: error?.message,
    refetch,
  };
}