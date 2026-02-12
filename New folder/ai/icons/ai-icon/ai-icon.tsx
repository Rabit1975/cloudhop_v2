import React from 'react';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';

export type AiIconProps = IconProps;

export function AiIcon(props: AiIconProps) {
  return (
    <Icon {...props}>
      <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 3.5 6.5 9.5 1 12l5.5 2.5L9 20.5 11.5 14.5 17 12 11.5 9.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
    </Icon>
  );
}