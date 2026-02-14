export type GamePlatform = 'html5' | 'unity' | 'external_stream';

export type GamePlayerProps = {
  /**
   * The URL of the game to embed.
   * For HTML5/Unity, this should be the URL to the index.html or playable build.
   */
  gameUrl: string;

  /**
   * The platform/type of the game.
   * Determines how the game is embedded.
   */
  platform: GamePlatform;

  /**
   * Title of the game for accessibility and display.
   */
  title?: string;

  /**
   * Optional cover image to display before the game starts.
   */
  coverUrl?: string;

  /**
   * Whether to start the game automatically.
   */
  autoPlay?: boolean;

  /**
   * Class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;
};