import { gql, useQuery } from '@apollo/client';
import { CalendarEvent } from '@cloudrabbit/hopmeets.entities.calendar-event';
import {
  HopmeetsMeeting,
  HopmeetsListMeetingsOptions,
} from './calendar-event-types.js';

export const LIST_MEETINGS_QUERY = gql`
  query ListMeetings(
    $offset: Int
    $limit: Int
    $status: HopmeetsMeetingStatus
    $participantUserId: ID
    $start: String
    $end: String
  ) {
    hopmeetsListMeetings(
      options: {
        offset: $offset
        limit: $limit
        status: $status
        participantUserId: $participantUserId
        dateRange: { start: $start, end: $end }
      }
    ) {
      id
      topic
      description
      startTime
      endTime
      hostId
      participants {
        userId
        role
      }
      status
      joinUrl
    }
  }
`;

export type UseListCalendarEventsOptions = {
  /**
   * Filter options for listing meetings.
   */
  filters?: HopmeetsListMeetingsOptions;

  /**
   * Optional mock data to return.
   */
  mockData?: CalendarEvent[];
};

export type UseListCalendarEventsResult = {
  /**
   * The list of fetched calendar events.
   */
  events: CalendarEvent[];

  /**
   * Loading state.
   */
  loading: boolean;

  /**
   * Error object if any.
   */
  error?: Error;

  /**
   * Function to refetch data.
   */
  refetch: () => void;
};

/**
 * Hook to list calendar events based on various filters like status, date range, or participant.
 */
export function useListCalendarEvents({
  filters,
  mockData,
}: UseListCalendarEventsOptions = {}): UseListCalendarEventsResult {
  const { data, loading, error, refetch } = useQuery(LIST_MEETINGS_QUERY, {
    variables: {
      offset: filters?.offset,
      limit: filters?.limit,
      status: filters?.status,
      participantUserId: filters?.participantUserId,
      start: filters?.dateRange?.start || '',
      end: filters?.dateRange?.end || '',
    },
    skip: !!mockData,
  });

  if (mockData) {
    return {
      events: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const meetings = (data?.hopmeetsListMeetings || []) as HopmeetsMeeting[];

  const events = meetings.map((meeting) =>
    CalendarEvent.from({
      id: meeting.id,
      title: meeting.topic,
      description: meeting.description || undefined,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      attendees: meeting.participants?.map((p) => p.userId) || [],
      location: meeting.joinUrl,
      meetingId: meeting.id,
    })
  );

  return {
    events,
    loading,
    error,
    refetch,
  };
}