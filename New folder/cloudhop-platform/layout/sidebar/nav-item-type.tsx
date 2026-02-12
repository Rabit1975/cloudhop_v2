import type { ComponentType } from 'react';

export type NavItem = {
  /**
   * Unique name for the navigation item.
   */
  name: string;

  /**
   * Label to display for the item.
   */
  label: string;

  /**
   * Destination URL.
   */
  href: string;

  /**
   * Optional icon component to display.
   */
  icon?: ComponentType<{ className?: string }>;
};