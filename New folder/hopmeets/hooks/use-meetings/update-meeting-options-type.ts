import { MeetingStatus } from '@cloudrabbit/hopmeets.entities.meeting';

export type UpdateMeetingOptions = {
  /**
   * The unique identifier of the meeting to update.
   */
  meetingId: string;

  /**
   * The new topic of the meeting.
   */
  topic?: string;

  /**
   * The new description of the meeting.
   */
  description?: string;

  /**
   * The new start time of the meeting.
   */
  startTime?: string;

  /**
   * The new end time of the meeting.
   */
  endTime?: string;

  /**
   * The new list of participant user IDs.
   */
  participantUserIds?: string[];

  /**
   * The new access code.
   */
  accessCode?: string;

  /**
   * The new status of the meeting.
   */
  status?: MeetingStatus;
};