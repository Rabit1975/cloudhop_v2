import React from 'react';
import classNames from 'classnames';
import { useAuth } from '@cloudrabbit/cloudhop-platform.hooks.use-auth';
import type { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { Button } from '@cloudrabbit/design.actions.button';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Avatar } from '@cloudrabbit/design.content.avatar';
import { Dropdown } from '@cloudrabbit/design.overlays.dropdown';
import type { UserBarMenuItem } from './user-bar-menu-item-type.js';
import styles from './user-bar.module.scss';

export type UserBarProps = {
  /**
   * List of menu items to display in the user dropdown.
   */
  menuItems?: UserBarMenuItem[];

  /**
   * Additional class name for the user bar.
   */
  className?: string;

  /**
   * Mock user for testing/preview purposes.
   * Passed to the useAuth hook.
   */
  mockUser?: User;
};

export function UserBar({ menuItems = [], className, mockUser }: UserBarProps) {
  // Pass the mockUser prop directly to the useAuth hook
  const { user, loading, logout } = useAuth(mockUser);

  if (loading) {
    return (
      <div className={classNames(styles.userBar, styles.loading, className)}>
        <Avatar size="md" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={classNames(styles.userBar, styles.authButtons, className)}>
        <Link href="/login" className={styles.loginLink}>
          Log in
        </Link>
        <Button href="/signup" appearance="primary">
          Get started
        </Button>
      </div>
    );
  }

  const UserTrigger = (
    <div className={styles.userTrigger}>
      <Avatar
        src={user.imageUrl}
        letters={user.username.slice(0, 2)} // Display first two initials if no image
        size="sm"
        alt={user.username}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{user.displayName || user.username}</span>
        <span className={styles.userEmail}>{user.email}</span>
      </div>
      <span className={styles.chevron}>▼</span>
    </div>
  );

  return (
    <div className={classNames(styles.userBar, className)}>
      <Dropdown placeholder={UserTrigger} openPosition="right">
        <div className={styles.dropdownHeader}>
          <div className={styles.headerName}>{user.displayName || user.username}</div>
          <div className={styles.headerEmail}>{user.email}</div>
        </div>

        {menuItems.map((item, index) => {
          // Use Link component if href is provided, otherwise use a button
          const ItemComponent = item.href ? Link : 'button';
          const itemProps: any = item.href 
            ? { href: item.href, noStyles: true } // Link props
            : { onClick: item.onClick, type: 'button' }; // Button props

          return (
            <ItemComponent
              key={`${item.label}-${index}`}
              className={classNames(styles.menuItem, {
                [styles.destructive]: item.destructive,
              })}
              {...itemProps}
            >
              {item.icon}
              <span>{item.label}</span>
            </ItemComponent>
          );
        })}

        {menuItems.length > 0 && <div className={styles.separator} />}

        <button
          className={classNames(styles.menuItem, styles.destructive)}
          onClick={() => logout()}
          type="button"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </Dropdown>
    </div>
  );
}