import React, { type CSSProperties, type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './link.module.scss';

export type LinkProps = {
  /**
   * The URL the link points to.
   */
  href?: string;

  /**
   * If true, forces the link to be rendered as an external <a> tag.
   */
  external?: boolean;

  /**
   * If true, removes default theme styling.
   */
  noStyles?: boolean;

  /**
   * The ARIA role of the link.
   */
  role?: string;

  /**
   * The tab index of the link.
   */
  tabIndex?: number;

  /**
   * If true, the link is disabled and unclickable.
   */
  disabled?: boolean;

  /**
   * The content to be rendered inside the link.
   */
  children?: ReactNode;

  /**
   * Specifies where to open the linked document.
   */
  target?: string;

  /**
   * Specifies the relationship between the current document and the linked document.
   */
  rel?: string;

  /**
   * Callback fired when the link is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Inline styles for the link.
   */
  style?: CSSProperties;

  /**
   * Additional class names for the link.
   */
  className?: string;
};

export function Link({
  href = '#',
  external = false,
  noStyles = false,
  role,
  tabIndex,
  disabled = false,
  children,
  target,
  rel,
  onClick,
  style,
  className,
}: LinkProps) {
  const isExternal = external || /^https?:\/\//.test(href) || /^mailto:/.test(href) || /^tel:/.test(href);

  const linkClassName = classNames(
    {
      [styles.link]: !noStyles,
      [styles.disabled]: disabled,
    },
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  // Determine the effective target and rel attributes based on whether it's an external link
  let effectiveTarget = target;
  let effectiveRel = rel;

  if (isExternal) {
    if (!effectiveTarget) {
      // If it's an external link and target is not explicitly provided, default to _blank
      effectiveTarget = '_blank';
    }
    if (!effectiveRel && effectiveTarget === '_blank') {
      // If rel is not explicitly provided and target is _blank, add noopener noreferrer for security
      effectiveRel = 'noopener noreferrer';
    }
  }

  if (isExternal) {
    return (
      <a
        href={href}
        className={linkClassName}
        role={role}
        tabIndex={disabled ? -1 : tabIndex}
        target={effectiveTarget}
        rel={effectiveRel}
        onClick={handleClick}
        style={style}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      to={href}
      className={linkClassName}
      role={role}
      tabIndex={disabled ? -1 : tabIndex}
      target={effectiveTarget}
      rel={effectiveRel}
      onClick={handleClick}
      style={style}
      aria-disabled={disabled}
    >
      {children}
    </RouterLink>
  );
}