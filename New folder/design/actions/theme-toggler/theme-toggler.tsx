import React, { type ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { useThemeController } from '@cloudrabbit/design.cloudrabbit-theme';
import styles from './theme-toggler.module.scss';

export type ThemeTogglerProps = {
  /**
   * Additional class name for the toggler button.
   */
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ThemeToggler({ className, ...rest }: ThemeTogglerProps) {
  const { themeMode, toggleTheme } = useThemeController();
  const isDark = themeMode === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={classNames(styles.toggler, className)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      {...rest}
    >
      <div className={classNames(styles.iconContainer, { [styles.dark]: isDark })}>
        <svg
          className={styles.sun}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg
          className={styles.moon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
}