import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './card.module.scss';
import type { CardVariant } from './card-variant-type.js';

export type CardProps = {
  /**
   * Main content of the card.
   */
  children?: ReactNode;

  /**
   * Optional title to display in the card body.
   */
  title?: string;

  /**
   * Visual style variant of the card.
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Content to render in the header section.
   */
  header?: ReactNode;

  /**
   * Content to render in the footer section.
   */
  footer?: ReactNode;

  /**
   * URL for the card cover image.
   */
  image?: string;

  /**
   * Alt text for the card image.
   */
  imageAlt?: string;

  /**
   * Whether the card interacts on hover (scales, shadow).
   * @default false
   */
  interactive?: boolean;

  /**
   * Additional class name for the card container.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card({
  children,
  title,
  variant = 'default',
  header,
  footer,
  image,
  imageAlt = '',
  interactive = false,
  className,
  style,
  ...rest
}: CardProps) {
  return (
    <div
      className={classNames(
        styles.card,
        styles[variant],
        {
          [styles.interactive]: interactive,
        },
        className
      )}
      style={style}
      {...rest}
    >
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={imageAlt} />
        </div>
      )}
      
      {header && (
        <div className={styles.header}>
          {header}
        </div>
      )}

      <div className={styles.body}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>

      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
}