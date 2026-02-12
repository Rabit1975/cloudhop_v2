import { useMutation, gql } from '@apollo/client';
import { Meeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { CreateMeetingOptions } from './create-meeting-options-type.js';

const CREATE_MEETING_MUTATION = gql`
  mutation CreateMeeting($options: HopmeetsCreateMeetingOptions!) {
    hopmeetsCreateMeeting(options: $options) {
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

export type CreateMeetingResult = {
  /**
   * The created meeting entity.
   */
  meeting?: Meeting;

  /**
   * Whether the mutation is currently executing.
   */
  loading: boolean;

  /**
   * Error message if the mutation failed.
   */
  error?: string;
};

/**
 * Hook to create a new meeting.
 * @returns A function to execute the creation and the current state.
 */
export function useCreateMeeting(): [
  (options: CreateMeetingOptions) => Promise<Meeting | undefined>,
  CreateMeetingResult
] {
  const [mutate, { data, loading, error }] = useMutation(CREATE_MEETING_MUTATION);

  const createMeeting = async (options: CreateMeetingOptions) => {
    try {
      const result = await mutate({
        variables: { options },
      });
      return result.data?.hopmeetsCreateMeeting
        ? Meeting.from(result.data.hopmeetsCreateMeeting)
        : undefined;
    } catch (e) {
      console.error('Failed to create meeting:', e);
      throw e;
    }
  };

  const meeting = data?.hopmeetsCreateMeeting
    ? Meeting.from(data.hopmeetsCreateMeeting)
    : undefined;

  return [
    createMeeting,
    {
      meeting,
      loading,
      error: error?.message,
    },
  ];
}