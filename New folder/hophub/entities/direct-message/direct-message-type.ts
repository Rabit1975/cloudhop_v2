export type PlainDirectMessage = {
  /**
   * unique identifier of the direct message.
   */
  id: string;

  /**
   * list of user ids participating in the direct message.
   */
  participantIds: string[];

  /**
   * the date and time when the direct message was created.
   */
  createdAt: string;

  /**
   * the date and time when the direct message was last updated.
   */
  updatedAt?: string;
};