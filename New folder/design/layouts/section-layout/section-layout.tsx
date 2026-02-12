import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import styles from './section-layout.module.scss';

export type SectionLayoutProps = {
  /**
   * The main content of the section.
   */
  children?: ReactNode;

  /**
   * Main title of the section.
   */
  title?: ReactNode;

  /**
   * Subtitle text displayed below the title.
   */
  subtitle?: ReactNode;

  /**
   * Small caption text displayed above the title.
   */
  caption?: ReactNode;

  /**
   * Alignment of the header content.
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Custom class name for the section container.
   */
  className?: string;

  /**
   * Custom class name for the content wrapper.
   */
  contentClassName?: string;

  /**
   * Custom class name for the header wrapper.
   */
  headerClassName?: string;
};

export function SectionLayout({
  children,
  title,
  subtitle,
  caption,
  align = 'left',
  className,
  contentClassName,
  headerClassName,
}: SectionLayoutProps) {
  const hasHeader = title || subtitle || caption;

  return (
    <section className={classNames(styles.sectionLayout, className)}>
      {hasHeader && (
        <header
          className={classNames(
            styles.header,
            styles[align],
            headerClassName
          )}
        >
          {caption && (
            <div className={styles.captionWrapper}>
              <Paragraph
                element="span"
                size="small"
                className={styles.caption}
              >
                {caption}
              </Paragraph>
            </div>
          )}
          {title && (
            <Heading
              element="h2"
              visualLevel="display-small"
              className={styles.title}
            >
              {title}
            </Heading>
          )}
          {subtitle && (
            <Paragraph size="large" className={styles.subtitle}>
              {subtitle}
            </Paragraph>
          )}
        </header>
      )}
      <div className={classNames(styles.content, contentClassName)}>
        {children}
      </div>
    </section>
  );
}