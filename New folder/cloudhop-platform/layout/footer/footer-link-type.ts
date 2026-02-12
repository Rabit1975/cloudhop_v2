export type FooterLink = {
  /**
   * Label text for the link.
   */
  label: string;

  /**
   * URL for the link.
   */
  href: string;
};

export type FooterLinkGroup = {
  /**
   * Optional title for the group of links.
   */
  title?: string;

  /**
   * List of links in this group.
   */
  links: FooterLink[];
};