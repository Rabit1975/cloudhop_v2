import { gql, useQuery } from '@apollo/client';
import { CalendarEvent } from '@cloudrabbit/hopmeets.entities.calendar-event';
import { HopmeetsMeeting } from './calendar-event-types.js';

export const GET_MEETING_QUERY = gql`
  query GetMeeting($meetingId: ID!) {
    hopmeetsGetMeeting(options: { meetingId: $meetingId }) {
      id
      topic
      description
      startTime
      endTime
      hostId
      participants {
        userId
        role
        joinedAt
        leftAt
      }
      status
      accessCode
      joinUrl
      createdAt
      updatedAt
    }
  }
`;

export type UseGetCalendarEventOptions = {
  /**
   * The ID of the meeting/event to fetch.
   */
  meetingId: string;

  /**
   * Optional mock data to return instead of executing the query.
   */
  mockData?: CalendarEvent;
};

export type UseGetCalendarEventResult = {
  /**
   * The fetched calendar event.
   */
  event?: CalendarEvent;

  /**
   * Loading state of the query.
   */
  loading: boolean;

  /**
   * Error object if the query failed.
   */
  error?: Error;

  /**
   * Function to refetch the data.
   */
  refetch: () => void;
};

/**
 * Hook to fetch a single calendar event (meeting) by its ID.
 * Maps the GraphQL HopmeetsMeeting to a CalendarEvent entity.
 */
export function useGetCalendarEvent({
  meetingId,
  mockData,
}: UseGetCalendarEventOptions): UseGetCalendarEventResult {
  const { data, loading, error, refetch } = useQuery(GET_MEETING_QUERY, {
    variables: { meetingId },
    skip: !!mockData || !meetingId,
  });

  if (mockData) {
    return {
      event: mockData,
      loading: false,
      error: undefined,
      refetch: () => {},
    };
  }

  const meeting = data?.hopmeetsGetMeeting as HopmeetsMeeting | undefined;

  const event = meeting
    ? CalendarEvent.from({
        id: meeting.id,
        title: meeting.topic,
        description: meeting.description || undefined,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
        attendees: meeting.participants?.map((p) => p.userId) || [],
        location: meeting.joinUrl,
        meetingId: meeting.id,
      })
    : undefined;

  return {
    event,
    loading,
    error,
    refetch,
  };
}