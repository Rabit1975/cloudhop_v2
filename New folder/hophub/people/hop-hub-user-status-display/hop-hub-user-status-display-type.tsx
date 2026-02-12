import type { CSSProperties } from 'react';

export type HopHubUserStatusDisplayProps = {
  /**
   * The status message content to be displayed.
   */
  message?: string;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom styles for the container.
   */
  style?: CSSProperties;
};