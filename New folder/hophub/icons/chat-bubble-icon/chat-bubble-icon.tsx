import React from 'react';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';
import classNames from 'classnames';
import styles from './chat-bubble-icon.module.scss';

export type ChatBubbleIconProps = IconProps;

/**
 * A standard chat bubble icon component.
 * Uses the base Icon component from the design system.
 */
export function ChatBubbleIcon({ className, ...rest }: ChatBubbleIconProps) {
  return (
    <Icon className={classNames(styles.chatBubbleIcon, className)} {...rest}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </Icon>
  );
}