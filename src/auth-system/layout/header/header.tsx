import React, { type ReactNode, type ComponentType, type CSSProperties } from 'react';
import classNames from 'classnames';
import { Logo } from '@cloudrabbit/design.content.logo';
import { Link } from '@cloudrabbit/design.navigation.link';
import type { HeaderLink } from './header-link-type.js';
import styles from './header.module.scss';

export type HeaderProps = {
  /**
   * The name of the brand to display in the logo.
   */
  name?: string;

  /**
   * Optional slogan text to display in the logo.
   */
  slogan?: string;

  /**
   * Custom logo element to override the default logo.
   */
  logo?: ReactNode;

  /**
   * List of navigation links to display.
   */
  links?: HeaderLink[];

  /**
   * Whether the user is currently authenticated.
   * Controls which links are displayed.
   */
  authenticated?: boolean;

  /**
   * Children content to render in the header, typically in the center.
   */
  children?: ReactNode;

  /**
   * List of component types to render as actions (e.g. theme toggler, buttons).
   */
  actions?: ComponentType[];

  /**
   * List of component types to render in the user bar (e.g. profile menu).
   */
  userBarItems?: ComponentType[];

  /**
   * Additional class name for the header root element.
   */
  className?: string;

  /**
   * Additional class name for the content container.
   */
  contentClassName?: string;

  /**
   * Inline styles for the header root element.
   */
  style?: CSSProperties;
};

export function Header({
  name,
  slogan,
  logo,
  links = [],
  authenticated = false,
  children,
  actions,
  userBarItems,
  className,
  contentClassName,
  style,
}: HeaderProps) {
  const visibleLinks = links.filter((link) => {
    if (link.authenticated === undefined) return true;
    return link.authenticated === authenticated;
  });

  return (
    <header className={classNames(styles.header, className)} style={style}>
      <div className={classNames(styles.container, contentClassName)}>
        <div className={styles.left}>
          <Logo name={name} slogan={slogan} logo={logo} />
          {visibleLinks.length > 0 && (
            <nav className={styles.nav}>
              {visibleLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {children && <div className={styles.center}>{children}</div>}

        <div className={styles.right}>
          {actions && actions.length > 0 && (
            <div className={styles.actions}>
              {actions.map((ActionComponent, index) => (
                <ActionComponent key={`action-${index}`} />
              ))}
            </div>
          )}
          
          {actions && actions.length > 0 && userBarItems && userBarItems.length > 0 && (
            <div className={styles.divider} />
          )}

          {userBarItems && userBarItems.length > 0 && (
            <div className={styles.userBar}>
              {userBarItems.map((UserComponent, index) => (
                <UserComponent key={`user-${index}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}