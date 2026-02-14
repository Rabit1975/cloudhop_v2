import type { ReactNode } from 'react';

export type SelectOption = {
  /**
   * Unique value for the option.
   */
  value: string;

  /**
   * Display label for the option.
   */
  label: string;

  /**
   * Optional icon to display next to the label.
   */
  icon?: ReactNode;

  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
};