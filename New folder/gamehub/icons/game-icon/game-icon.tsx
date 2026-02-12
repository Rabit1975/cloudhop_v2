import React, { type SVGProps } from 'react';
import { Icon } from '@cloudrabbit/design.content.icon';

export type GameIconProps = {
  /**
   * size of the icon in pixels.
   */
  size?: number;

  /**
   * color of the icon.
   */
  color?: string;

  /**
   * class name to override styles.
   */
  className?: string;
} & SVGProps<SVGSVGElement>;

export function GameIcon({ size, color, className, ...rest }: GameIconProps) {
  return (
    <Icon size={size} color={color} className={className} {...rest}>
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S19.67 9 20.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </Icon>
  );
}