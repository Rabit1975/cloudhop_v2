import React from 'react';
import { Icon, type IconProps } from '@cloudrabbit/design.content.icon';

export type AddIconProps = IconProps;

/**
 * An icon component displaying a plus sign used for add actions.
 * Wraps the generic Icon component with a predefined SVG path.
 */
export function AddIcon({ ...rest }: AddIconProps) {
  return (
    <Icon {...rest}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </Icon>
  );
}