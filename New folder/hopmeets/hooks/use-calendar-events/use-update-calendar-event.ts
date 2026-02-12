import { gql, useMutation } from '@apollo/client';
import { CalendarEvent } from '@cloudrabbit/hopmeets.entities.calendar-event';
import {
  HopmeetsUpdateMeetingOptions,
  HopmeetsMeeting,
} from './calendar-event-types.js';

export const UPDATE_MEETING_MUTATION = gql`
  mutation UpdateMeeting(
    $meetingId: ID!
    $topic: String
    $description: String
    $startTime: String
    $endTime: String
    $participantUserIds: [ID]
    $accessCode: String
    $status: HopmeetsMeetingStatus
  ) {
    hopmeetsUpdateMeeting(
      options: {
        meetingId: $meetingId
        topic: $topic
        description: $description
        startTime: $startTime
        endTime: $endTime
        participantUserIds: $participantUserIds
        accessCode: $accessCode
        status: $status
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
      status
    }
  }
`;

export type UseUpdateCalendarEventResult = {
  /**
   * Function to trigger the update mutation.
   */
  updateEvent: (options: HopmeetsUpdateMeetingOptions) => Promise<CalendarEvent>;

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
 * Hook to update an existing calendar event (meeting).
 */
export function useUpdateCalendarEvent(): UseUpdateCalendarEventResult {
  const [mutate, { loading, error }] = useMutation(UPDATE_MEETING_MUTATION);

  const updateEvent = async (options: HopmeetsUpdateMeetingOptions) => {
    const { data } = await mutate({
      variables: {
        meetingId: options.meetingId,
        topic: options.topic,
        description: options.description,
        startTime: options.startTime,
        endTime: options.endTime,
        participantUserIds: options.participantUserIds,
        accessCode: options.accessCode,
        status: options.status,
      },
    });

    const meeting = data.hopmeetsUpdateMeeting as HopmeetsMeeting;

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
    updateEvent,
    loading,
    error,
  };
}