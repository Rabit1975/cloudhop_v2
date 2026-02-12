export type PlainCalendarEvent = {
  /**
   * Unique identifier for the event.
   */
  id: string;

  /**
   * Title of the event.
   */
  title: string;

  /**
   * Detailed description of the event.
   */
  description?: string;

  /**
   * Start time of the event in ISO 8601 format.
   */
  startTime: string;

  /**
   * End time of the event in ISO 8601 format.
   */
  endTime: string;

  /**
   * List of user IDs or emails attending the event.
   */
  attendees: string[];

  /**
   * Physical or virtual location of the event.
   */
  location?: string;

  /**
   * Optional reference to a meeting entity ID if associated with a video conference.
   */
  meetingId?: string;
};