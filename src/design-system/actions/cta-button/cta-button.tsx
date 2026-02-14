import React, { type ReactNode, type MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import type { CtaAppearance } from './cta-appearance-type.js';
import styles from './cta-button.module.scss';

export type CtaButtonProps = {
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
  appearance?: CtaAppearance;
};

export function CtaButton({
  children,
  onClick,
  type = 'button',
  href,
  disabled = false,
  external = false,
  className,
  appearance = 'primary',
  ...rest
}: CtaButtonProps) {
  const appearanceClass = styles[appearance];

  return (
    <Button
      type={type}
      href={href}
      disabled={disabled}
      external={external}
      onClick={onClick}
      appearance={appearance}
      className={classNames(styles.ctaButton, appearanceClass, className)}
      {...rest}
    >
      {children}
    </Button>
  );
}