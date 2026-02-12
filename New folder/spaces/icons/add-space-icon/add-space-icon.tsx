import React from 'react';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';

export type AddSpaceIconProps = IconProps;

export function AddSpaceIcon(props: AddSpaceIconProps) {
  return (
    <Icon {...props}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </Icon>
  );
}