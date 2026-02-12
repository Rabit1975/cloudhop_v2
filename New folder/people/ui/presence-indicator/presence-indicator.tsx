import React from 'react';
import classNames from 'classnames';
import type { UserPresenceStatus } from '@cloudrabbit/people.entities.presence-status';
import styles from './presence-indicator.module.scss';

export type PresenceIndicatorProps = {
  /**
   * The current presence status to display.
   */
  status: UserPresenceStatus;

  /**
   * The size of the indicator.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Additional class name for styling.
   */
  className?: string;

  /**
   * Inline styles for the component.
   */
  style?: React.CSSProperties;
};

export function PresenceIndicator({
  status,
  size = 'medium',
  className,
  style,
}: PresenceIndicatorProps) {
  const statusClass = styles[status];
  const sizeClass = styles[size];

  return (
    <span
      className={classNames(styles.presenceIndicator, statusClass, sizeClass, className)}
      style={style}
      title={`User is ${status}`}
      aria-label={`Status: ${status}`}
      role="status"
    />
  );
}