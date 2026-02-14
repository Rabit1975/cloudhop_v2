import React, { type SVGProps } from 'react';
import classNames from 'classnames';
import styles from './icon.module.scss';

export type IconProps = {
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

export function Icon({
  size = 24,
  color = 'currentColor',
  className,
  children,
  ...rest
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={classNames(styles.icon, className)}
      role="img" // Added role for accessibility testing
      {...rest}
    >
      {children}
    </svg>
  );
}