import { MeetingStatus } from '@cloudrabbit/hopmeets.entities.meeting';
import { DateRangeOptions } from './date-range-options-type.js';

export type ListMeetingsOptions = {
  /**
   * The number of items to skip.
   */
  offset?: number;

  /**
   * The maximum number of items to return.
   */
  limit?: number;

  /**
   * Filter meetings by status.
   */
  status?: MeetingStatus;

  /**
   * Filter meetings by participant user ID.
   */
  participantUserId?: string;

  /**
   * Filter meetings by date range.
   */
  dateRange?: DateRangeOptions;
};