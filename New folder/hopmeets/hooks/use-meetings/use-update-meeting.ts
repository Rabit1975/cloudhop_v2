import { useMutation, gql } from '@apollo/client';
import { Meeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { UpdateMeetingOptions } from './update-meeting-options-type.js';

const UPDATE_MEETING_MUTATION = gql`
  mutation UpdateMeeting($options: HopmeetsUpdateMeetingOptions!) {
    hopmeetsUpdateMeeting(options: $options) {
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

export type UpdateMeetingResult = {
  /**
   * The updated meeting entity.
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
 * Hook to update an existing meeting.
 * @returns A function to execute the update and the current state.
 */
export function useUpdateMeeting(): [
  (options: UpdateMeetingOptions) => Promise<Meeting | undefined>,
  UpdateMeetingResult
] {
  const [mutate, { data, loading, error }] = useMutation(UPDATE_MEETING_MUTATION);

  const updateMeeting = async (options: UpdateMeetingOptions) => {
    try {
      const result = await mutate({
        variables: { options },
      });
      return result.data?.hopmeetsUpdateMeeting
        ? Meeting.from(result.data.hopmeetsUpdateMeeting)
        : undefined;
    } catch (e) {
      console.error('Failed to update meeting:', e);
      throw e;
    }
  };

  const meeting = data?.hopmeetsUpdateMeeting
    ? Meeting.from(data.hopmeetsUpdateMeeting)
    : undefined;

  return [
    updateMeeting,
    {
      meeting,
      loading,
      error: error?.message,
    },
  ];
}