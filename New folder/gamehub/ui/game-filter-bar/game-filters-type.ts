export type GameFilters = {
  /**
   * Filter by game genre (category ID).
   */
  genre?: string;

  /**
   * Filter by platform (GameType).
   */
  platform?: string;

  /**
   * Filter by developer name.
   */
  developer?: string;
};