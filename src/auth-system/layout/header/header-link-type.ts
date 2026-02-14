export type HeaderLink = {
  /**
   * The text label for the link.
   */
  label: string;

  /**
   * The URL for the link.
   */
  href: string;

  /**
   * If true, link only shows when authenticated.
   * If false, link only shows when NOT authenticated.
   * If undefined, link always shows.
   */
  authenticated?: boolean;
};