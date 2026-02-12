export type PlayerContent = {
  /**
   * The unique ID for the searchable content, usually derived from `userId`.
   */
  id: string; 
  /**
   * The type of content, always 'player' for this component.
   */
  type: 'player'; 
  /**
   * The main title to display for the search result (e.g., displayName or username).
   */
  title: string; 
  /**
   * The URL to navigate to when this result is clicked (e.g., '/profile?userId=u-1').
   */
  url: string; 

  /**
   * The unique identifier of the user.
   */
  userId: string;

  /**
   * The username of the player.
   */
  username: string;

  /**
   * The display name of the player.
   */
  displayName?: string;

  /**
   * The URL of the player's avatar image.
   */
  avatarUrl?: string;

  /**
   * A short status message or bio snippet.
   */
  statusMessage?: string;

  /**
   * Current online status of the player.
   */
  presenceStatus?: 'online' | 'busy' | 'away' | 'offline';
};