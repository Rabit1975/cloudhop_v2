import React from 'react';
import classNames from 'classnames';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';
import styles from './event.module.scss';

export type EventProps = IconProps;

export function Event({ className, ...rest }: EventProps) {
  return (
    <Icon className={classNames(styles.event, className)} {...rest}>
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </Icon>
  );
}