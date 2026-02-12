import React, { useState } from 'react';
import classNames from 'classnames';
import { useAuth } from '@cloudrabbit/cloudhop-platform.hooks.use-auth';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Tooltip } from '@cloudrabbit/design.overlays.tooltip';
import type { NavItem } from './nav-item-type.js';
import styles from './sidebar.module.scss';

export type SidebarProps = {
  /**
   * List of navigation items to display.
   */
  items: NavItem[];

  /**
   * Whether the sidebar is initially expanded.
   */
  initialOpen?: boolean;

  /**
   * Additional class name for the sidebar container.
   */
  className?: string;

  /**
   * Optional mock user for testing/preview purposes.
   * If provided, the sidebar will render as if this user is authenticated.
   */
  mockUser?: any;
};

function ToggleIcon() {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M10 12L6 8L10 4" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sidebar({ items, initialOpen = true, className, mockUser }: SidebarProps) {
  const { user } = useAuth(mockUser);
  const [isOpen, setIsOpen] = useState(initialOpen);

  // Display only to authenticated users
  if (!user) {
    return null;
  }

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside 
      className={classNames(
        styles.sidebar, 
        { [styles.isOpen]: isOpen }, 
        className
      )}
    >
      <div className={styles.header}>
        <button 
          onClick={toggleSidebar} 
          className={styles.toggle}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          type="button"
        >
          <ToggleIcon />
        </button>
      </div>

      <nav className={styles.nav}>
        {items.map((item) => {
          const Icon = item.icon;
          
          const LinkContent = (
            <>
              {Icon && (
                <div className={styles.icon}>
                  <Icon />
                </div>
              )}
              {isOpen && <span className={styles.label}>{item.label}</span>}
            </>
          );

          const linkElement = (
            <Link 
              href={item.href} 
              className={styles.link}
              noStyles
            >
              {LinkContent}
            </Link>
          );

          if (!isOpen) {
            return (
              <Tooltip 
                key={item.name} 
                content={item.label} 
                position="right"
              >
                <div>{linkElement}</div>
              </Tooltip>
            );
          }

          return (
            <div key={item.name}>
              {linkElement}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}