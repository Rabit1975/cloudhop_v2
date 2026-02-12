import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { BadgeColor } from './badge-color-type.js';
import { BadgeSize } from './badge-size-type.js';
import { BadgeVariant } from './badge-variant-type.js';
import styles from './badge.module.scss';

export type BadgeProps = {
  /**
   * Text label to display in the badge.
   * Prefer using `label` over `children` for simple text.
   */
  label?: string;

  /**
   * Custom class name for the badge wrapper.
   */
  className?: string;

  /**
   * Visual style variant of the badge.
   * @default 'subtle'
   */
  variant?: BadgeVariant;

  /**
   * Size dimension of the badge.
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Icon element to display before the label.
   */
  icon?: ReactNode;

  /**
   * Semantic color theme of the badge.
   * @default 'neutral'
   */
  color?: BadgeColor;
  
  /**
   * Child elements. Can be used instead of label for complex content.
   */
  children?: ReactNode;
};

export function Badge({
  label,
  children,
  className,
  variant = 'subtle',
  size = 'md',
  icon,
  color = 'neutral',
}: BadgeProps) {
  return (
    <span
      className={classNames(
        styles.badge,
        styles[size],
        styles[variant],
        styles[color],
        className
      )}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label || children}
    </span>
  );
}