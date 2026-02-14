import type { ReactNode } from 'react';

export type TabItem = {
  /**
   * The label to display for the tab.
   */
  label: string;

  /**
   * The URL to navigate to.
   */
  href: string;

  /**
   * Optional icon to display.
   */
  icon?: ReactNode;
};