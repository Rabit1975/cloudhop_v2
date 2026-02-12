import { PlainMeeting, MeetingStatus, MeetingParticipant } from './meeting-type.js';

export class Meeting {
  constructor(
    /**
     * The unique identifier of the meeting.
     */
    readonly id: string,

    /**
     * The topic or title of the meeting.
     */
    readonly topic: string,

    /**
     * The start time of the meeting in ISO format.
     */
    readonly startTime: string,

    /**
     * The end time of the meeting in ISO format.
     */
    readonly endTime: string,

    /**
     * The user ID of the meeting host.
     */
    readonly hostId: string,

    /**
     * The current status of the meeting.
     */
    readonly status: MeetingStatus,

    /**
     * The URL to join the meeting.
     */
    readonly joinUrl: string,

    /**
     * The timestamp when the meeting was created.
     */
    readonly createdAt: string,

    /**
     * The list of participants in the meeting.
     */
    readonly participants: MeetingParticipant[] = [],

    /**
     * The description of the meeting agenda.
     */
    readonly description?: string,

    /**
     * The access code for joining the meeting, if applicable.
     */
    readonly accessCode?: string,

    /**
     * The timestamp when the meeting was last updated.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Returns true if the meeting is currently scheduled.
   */
  get isScheduled() {
    return this.status === 'scheduled';
  }

  /**
   * Alias for the topic property.
   */
  get title() {
    return this.topic;
  }

  /**
   * Alias for the joinUrl property.
   */
  get meetingLink() {
    return this.joinUrl;
  }

  /**
   * Returns the meeting room identifier, preferring access code if available.
   */
  get meetingRoomId() {
    return this.accessCode || this.id;
  }

  /**
   * Serializes the Meeting entity into a plain object.
   */
  toObject(): PlainMeeting {
    return {
      id: this.id,
      topic: this.topic,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      hostId: this.hostId,
      participants: this.participants,
      status: this.status,
      accessCode: this.accessCode,
      joinUrl: this.joinUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a Meeting entity from a plain object.
   */
  static from(plain: PlainMeeting) {
    return new Meeting(
      plain.id,
      plain.topic,
      plain.startTime,
      plain.endTime,
      plain.hostId,
      plain.status,
      plain.joinUrl,
      plain.createdAt,
      plain.participants,
      plain.description,
      plain.accessCode,
      plain.updatedAt
    );
  }
}