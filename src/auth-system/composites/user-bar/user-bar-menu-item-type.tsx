import type { ReactNode } from 'react';

export type UserBarMenuItem = {
  /**
   * The text label of the menu item.
   */
  label: string;

  /**
   * Optional link destination.
   */
  href?: string;

  /**
   * Optional icon to display.
   */
  icon?: ReactNode;

  /**
   * Callback function when clicked.
   */
  onClick?: () => void;

  /**
   * If true, styles the item to indicate a destructive action (e.g., delete, logout).
   */
  destructive?: boolean;
};