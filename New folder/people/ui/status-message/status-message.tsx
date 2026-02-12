import React from 'react';
import classNames from 'classnames';
import { Tooltip } from '@cloudrabbit/design.overlays.tooltip';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import styles from './status-message.module.scss';

export type StatusMessageProps = {
  /**
   * The status message content to be displayed.
   */
  message: string;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom styles for the container.
   */
  style?: React.CSSProperties;
};

export function StatusMessage({ message, className, style }: StatusMessageProps) {
  if (!message) return null;

  return (
    <Tooltip
      content={message}
      className={classNames(styles.statusMessage, className)}
      style={style}
    >
      <Paragraph
        element="span"
        size="small"
        className={styles.text}
      >
        {message}
      </Paragraph>
    </Tooltip>
  );
}