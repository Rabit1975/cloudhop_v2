import React, { type ReactNode, type MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import styles from './button.module.scss';

export type ButtonAppearance = 'primary' | 'secondary' | 'tertiary';

export type ButtonProps = {
  /**
   * Content to be rendered inside the button.
   */
  children?: ReactNode;

  /**
   * Callback fired when the button is clicked.
   */
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;

  /**
   * The type of the button.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * If provided, the button will be rendered as a link.
   */
  href?: string;

  /**
   * If true, the button is disabled and unclickable.
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, the link opens in a new tab.
   * Only applicable when href is provided.
   * @default false
   */
  external?: boolean;

  /**
   * Additional class names for the button.
   */
  className?: string;

  /**
   * The visual style of the button.
   * @default 'primary'
   */
  appearance?: ButtonAppearance;
};

export function Button({
  children,
  onClick,
  type = 'button',
  href,
  disabled = false,
  external = false,
  className,
  appearance = 'primary',
  ...rest
}: ButtonProps) {
  const buttonClass = classNames(
    styles.button,
    styles[appearance],
    {
      [styles.disabled]: disabled,
    },
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        external={external}
        className={buttonClass}
        disabled={disabled}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        noStyles
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      {...rest}
    >
      {children}
    </button>
  );
}