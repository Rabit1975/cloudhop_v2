import { useQuery, gql } from '@apollo/client';
import { Meeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { ListMeetingsOptions } from './list-meetings-options-type.js';

const LIST_MEETINGS_QUERY = gql`
  query ListMeetings($options: HopmeetsListMeetingsOptions) {
    hopmeetsListMeetings(options: $options) {
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

export type UseMeetingListOptions = {
  /**
   * Options to filter and paginate the meeting list.
   */
  listOptions?: ListMeetingsOptions;

  /**
   * Provide mock data for testing or preview.
   */
  mockData?: Meeting[];
};

export type UseMeetingListResult = {
  /**
   * The list of fetched meeting entities.
   */
  meetings: Meeting[];

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
 * Hook to fetch a list of meetings.
 * @param options Configuration for listing meetings.
 * @returns The list of meetings, loading state, and error information.
 */
export function useMeetingList({ listOptions, mockData }: UseMeetingListOptions = {}): UseMeetingListResult {
  const skip = Boolean(mockData);

  const { data, loading, error, refetch } = useQuery(LIST_MEETINGS_QUERY, {
    variables: { options: listOptions },
    skip,
  });

  const meetings = mockData || (data?.hopmeetsListMeetings
    ? data.hopmeetsListMeetings.map((m: any) => Meeting.from(m))
    : []);

  return {
    meetings,
    loading: skip ? false : loading,
    error: error?.message,
    refetch,
  };
}