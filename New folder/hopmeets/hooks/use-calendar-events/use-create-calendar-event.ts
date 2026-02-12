import { gql, useMutation } from '@apollo/client';
import { CalendarEvent } from '@cloudrabbit/hopmeets.entities.calendar-event';
import {
  HopmeetsCreateMeetingOptions,
  HopmeetsMeeting,
} from './calendar-event-types.js';

export const CREATE_MEETING_MUTATION = gql`
  mutation CreateMeeting(
    $topic: String!
    $description: String
    $startTime: String!
    $endTime: String!
    $participantUserIds: [ID]
    $accessCode: String
  ) {
    hopmeetsCreateMeeting(
      options: {
        topic: $topic
        description: $description
        startTime: $startTime
        endTime: $endTime
        participantUserIds: $participantUserIds
        accessCode: $accessCode
      }
    ) {
      id
      topic
      description
      startTime
      endTime
      participants {
        userId
      }
      joinUrl
    }
  }
`;

export type UseCreateCalendarEventResult = {
  /**
   * Function to trigger the create mutation.
   */
  createEvent: (options: HopmeetsCreateMeetingOptions) => Promise<CalendarEvent>;

  /**
   * Loading state of the mutation.
   */
  loading: boolean;

  /**
   * Error object if mutation fails.
   */
  error?: Error;
};

/**
 * Hook to create a new calendar event (meeting).
 */
export function useCreateCalendarEvent(): UseCreateCalendarEventResult {
  const [mutate, { loading, error }] = useMutation(CREATE_MEETING_MUTATION);

  const createEvent = async (options: HopmeetsCreateMeetingOptions) => {
    const { data } = await mutate({
      variables: {
        topic: options.topic,
        description: options.description,
        startTime: options.startTime,
        endTime: options.endTime,
        participantUserIds: options.participantUserIds,
        accessCode: options.accessCode,
      },
    });

    const meeting = data.hopmeetsCreateMeeting as HopmeetsMeeting;

    return CalendarEvent.from({
      id: meeting.id,
      title: meeting.topic,
      description: meeting.description || undefined,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      attendees: meeting.participants?.map((p) => p.userId) || [],
      location: meeting.joinUrl,
      meetingId: meeting.id,
    });
  };

  return {
    createEvent,
    loading,
    error,
  };
}