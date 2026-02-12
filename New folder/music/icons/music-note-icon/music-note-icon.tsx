import React from 'react';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';
import classNames from 'classnames';
import styles from './music-note-icon.module.scss';

export type MusicNoteIconProps = IconProps;

export function MusicNoteIcon({ className, ...rest }: MusicNoteIconProps) {
  return (
    <Icon className={classNames(styles.musicNoteIcon, className)} {...rest}>
      <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z" />
    </Icon>
  );
}