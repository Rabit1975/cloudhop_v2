import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { CloudHopLogo } from './cloud-hop-logo.js';
import styles from './logo.module.scss';

export type LogoProps = {
  /**
   * The name of the brand to display.
   * @default "CloudHop"
   */
  name?: string;

  /**
   * The URL to navigate to when clicked.
   * @default "/"
   */
  href?: string;

  /**
   * The size of the logo icon in pixels.
   * @default 32
   */
  size?: number;

  /**
   * Optional slogan text to display below or next to the name.
   */
  slogan?: string;

  /**
   * Custom logo element to override the default SVG.
   */
  logo?: ReactNode;

  /**
   * If true, displays only the logo icon without text.
   * @default false
   */
  minimal?: boolean;

  /**
   * Additional class name for the root element.
   */
  className?: string;
};

export function Logo({
  name = 'CloudHop',
  href = '/',
  size = 32,
  slogan,
  logo,
  minimal = false,
  className,
}: LogoProps) {
  const logoContent = logo || <CloudHopLogo style={{ width: '100%', height: '100%' }} />;

  return (
    <Link
      href={href}
      className={classNames(styles.logo, className)}
      noStyles
    >
      <div 
        className={styles.iconContainer} 
        style={{ width: size, height: size }}
      >
        {logoContent}
      </div>
      
      {!minimal && (
        <div className={styles.content}>
          <span className={styles.name}>{name}</span>
          {slogan && <span className={styles.slogan}>{slogan}</span>}
        </div>
      )}
    </Link>
  );
}