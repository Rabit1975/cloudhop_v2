import React from 'react';
import classNames from 'classnames';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';
import styles from './ai-generate-icon.module.scss';

export type AiGenerateIconProps = IconProps;

export function AiGenerateIcon({ className, ...rest }: AiGenerateIconProps) {
  return (
    <Icon className={classNames(styles.aiGenerateIcon, className)} {...rest}>
      <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 6 6.5 9.5 3 12l3.5 2.5L9 18l2.5-3.5L15 12l-3.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
    </Icon>
  );
}