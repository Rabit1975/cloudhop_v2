import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './heading.module.scss';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingVisualLevel =
  | HeadingLevel
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'body-large'
  | 'body-medium';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The semantic HTML level of the heading.
   * @default 'h1'
   */
  element?: HeadingLevel;

  /**
   * The visual style level to apply, allowing visual size to differ from semantic level.
   * Defaults to the value of `element`.
   */
  visualLevel?: HeadingVisualLevel;

  /**
   * Whether to use the inverse text color (useful on dark backgrounds).
   * @default false
   */
  inverseColor?: boolean;

  /**
   * Custom class name for the heading.
   */
  className?: string;

  /**
   * The content of the heading.
   */
  children?: ReactNode;
}

export function Heading({
  element = 'h1',
  visualLevel,
  inverseColor = false,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Element = element;
  
  // Determine the visual class based on visualLevel or fallback to element
  const sizeClass = visualLevel ? getVisualClass(visualLevel) : styles[element];

  return (
    <Element
      className={classNames(
        styles.heading,
        sizeClass,
        {
          [styles.inverse]: inverseColor,
        },
        className
      )}
      {...rest}
    >
      {children}
    </Element>
  );
}

function getVisualClass(level: HeadingVisualLevel): string {
  switch (level) {
    case 'display-large':
      return styles.displayLarge;
    case 'display-medium':
      return styles.displayMedium;
    case 'display-small':
      return styles.displaySmall;
    case 'body-large':
      return styles.bodyLarge;
    case 'body-medium':
      return styles.bodyMedium;
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return styles[level];
    default:
      return styles.h1;
  }
}