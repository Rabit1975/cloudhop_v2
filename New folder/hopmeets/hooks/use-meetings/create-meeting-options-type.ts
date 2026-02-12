export type CreateMeetingOptions = {
  /**
   * The topic or title of the meeting.
   */
  topic: string;

  /**
   * The description of the meeting.
   */
  description?: string;

  /**
   * The start time of the meeting in ISO format.
   */
  startTime: string;

  /**
   * The end time of the meeting in ISO format.
   */
  endTime: string;

  /**
   * IDs of users to invite as participants.
   */
  participantUserIds?: string[];

  /**
   * Access code for the meeting.
   */
  accessCode?: string;
};