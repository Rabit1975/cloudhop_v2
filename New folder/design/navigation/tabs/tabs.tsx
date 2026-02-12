import React from 'react';
import { Link, useLocation } from '@cloudrabbit/design.navigation.link';
import classNames from 'classnames';
import type { TabItem } from './tab-item-type.js';
import styles from './tabs.module.scss';

export type TabsProps = {
  /**
   * List of tabs to display.
   */
  tabs: TabItem[];

  /**
   * Class name for the container.
   */
  className?: string;

  /**
   * Custom style object.
   */
  style?: React.CSSProperties;
};

export function Tabs({ tabs, className, style }: TabsProps) {
  const location = useLocation();
  const currentPath = location?.pathname || '';

  return (
    <nav className={classNames(styles.tabs, className)} style={style}>
      {tabs.map((tab) => {
        // Determine active state: exact match or sub-path match for nested routes
        // We avoid partial string matches (e.g. /users matching /users-list) by checking for slash boundary
        const isActive =
          currentPath === tab.href ||
          (tab.href !== '/' && currentPath.startsWith(`${tab.href}/`));

        return (
          <Link
            key={tab.href}
            href={tab.href}
            noStyles
            className={classNames(styles.tab, {
              [styles.active]: isActive,
            })}
          >
            {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}