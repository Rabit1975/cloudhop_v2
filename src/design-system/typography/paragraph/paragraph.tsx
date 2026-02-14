import React from 'react';
import classNames from 'classnames';
import styles from './paragraph.module.scss';

export type ParagraphProps = {
  /**
   * The content to be rendered within the paragraph.
   */
  children?: React.ReactNode;

  /**
   * The underlying HTML element to render.
   * @default 'p'
   */
  element?: keyof React.JSX.IntrinsicElements;

  /**
   * Custom class names to apply to the paragraph.
   */
  className?: string;

  /**
   * Custom styles to apply to the paragraph.
   */
  style?: React.CSSProperties;

  /**
   * The size of the paragraph text.
   * @default 'default'
   */
  size?: 'large' | 'medium' | 'default' | 'small';
};

export function Paragraph({
  children,
  element = 'p',
  className,
  style,
  size = 'default',
}: ParagraphProps) {
  const Component = element;

  return (
    <Component
      className={classNames(styles.paragraph, styles[size], className)}
      style={style}
    >
      {children}
    </Component>
  );
}