import type { ReactNode } from 'react';

export type FooterSocialLink = {
  /**
   * Icon element to display.
   */
  icon: ReactNode;

  /**
   * URL for the social link.
   */
  href: string;

  /**
   * Accessibility label for the link.
   */
  label: string;
};