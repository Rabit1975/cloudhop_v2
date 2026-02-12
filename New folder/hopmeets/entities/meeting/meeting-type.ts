export type MeetingStatus = 'scheduled' | 'live' | 'ended' | 'canceled';

export type ParticipantRole = 'host' | 'co_host' | 'presenter' | 'attendee';

export type MeetingParticipant = {
  /**
   * The unique identifier of the user.
   */
  userId: string;

  /**
   * The role of the participant in the meeting.
   */
  role: ParticipantRole;

  /**
   * The timestamp when the participant joined.
   */
  joinedAt?: string;

  /**
   * The timestamp when the participant left.
   */
  leftAt?: string;
};

export type PlainMeeting = {
  /**
   * The unique identifier of the meeting.
   */
  id: string;

  /**
   * The topic or title of the meeting.
   */
  topic: string;

  /**
   * The description of the meeting agenda.
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
   * The user ID of the meeting host.
   */
  hostId: string;

  /**
   * The list of participants in the meeting.
   */
  participants: MeetingParticipant[];

  /**
   * The current status of the meeting.
   */
  status: MeetingStatus;

  /**
   * The access code for joining the meeting, if applicable.
   */
  accessCode?: string;

  /**
   * The URL to join the meeting.
   */
  joinUrl: string;

  /**
   * The timestamp when the meeting was created.
   */
  createdAt: string;

  /**
   * The timestamp when the meeting was last updated.
   */
  updatedAt?: string;
};