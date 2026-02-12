import React from 'react';
import classNames from 'classnames';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';
import styles from './video-call.module.scss';

export type VideoCallProps = IconProps;

export function VideoCall({ className, ...rest }: VideoCallProps) {
  return (
    <Icon className={classNames(styles.videoCall, className)} {...rest}>
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </Icon>
  );
}