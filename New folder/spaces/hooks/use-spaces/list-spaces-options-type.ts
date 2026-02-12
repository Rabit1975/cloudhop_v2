export type ListSpacesOptions = {
  /**
   * Filter spaces by owner ID.
   */
  ownerId?: string;

  /**
   * Filter spaces by member ID.
   */
  memberId?: string;

  /**
   * Search term for filtering spaces.
   */
  search?: string;

  /**
   * Limit the number of results.
   */
  limit?: number;

  /**
   * Offset for pagination.
   */
  offset?: number;
};