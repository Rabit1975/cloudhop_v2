import React from 'react';
import classNames from 'classnames';
import { StatusMessage } from '@cloudrabbit/people.ui.status-message';
import type { HopHubUserStatusDisplayProps } from './hop-hub-user-status-display-type.js';
import styles from './hop-hub-user-status-display.module.scss';

export function HopHubUserStatusDisplay({ message, className, style }: HopHubUserStatusDisplayProps) {
  if (!message) return null;

  return (
    <StatusMessage
      message={message}
      className={classNames(styles.hopHubUserStatusDisplay, className)}
      style={style}
    />
  );
}