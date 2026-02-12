import React from 'react';
import classNames from 'classnames';
import { PresenceIndicator } from '@cloudrabbit/people.ui.presence-indicator';
import type { UserPresenceStatus } from '@cloudrabbit/people.entities.presence-status';
import styles from './hop-hub-presence-indicator.module.scss';

export type HopHubPresenceIndicatorProps = {
  /**
   * The current presence status of the user.
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

export function HopHubPresenceIndicator({
  status,
  size = 'medium',
  className,
  style,
}: HopHubPresenceIndicatorProps) {
  return (
    <PresenceIndicator
      status={status}
      size={size}
      className={classNames(styles.hopHubPresenceIndicator, className)}
      style={style}
    />
  );
}