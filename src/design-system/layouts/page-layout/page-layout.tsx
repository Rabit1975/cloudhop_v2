import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { Tabs, type TabItem } from '@cloudrabbit/design.navigation.tabs';
import styles from './page-layout.module.scss';

export type PageLayoutProps = {
  /**
   * The primary content of the page.
   */
  children?: ReactNode;

  /**
   * The title of the page to be displayed in the browser tab.
   * Uses react-helmet.
   */
  title?: string;

  /**
   * Meta description for SEO purposes.
   */
  description?: string;

  /**
   * Optional list of tabs for inner page navigation.
   * If provided, a Tabs component will be rendered at the top of the layout.
   */
  tabs?: TabItem[];

  /**
   * Additional class name for the root container.
   */
  className?: string;

  /**
   * Additional class name for the content area.
   */
  contentClassName?: string;

  /**
   * Inline styles for the root container.
   */
  style?: React.CSSProperties;
};

export function PageLayout({
  children,
  title = 'CloudHop',
  description,
  tabs,
  className,
  contentClassName,
  style,
}: PageLayoutProps) {
  return (
    <div className={classNames(styles.pageLayout, className)} style={style}>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>

      {tabs && tabs.length > 0 && (
        <div className={styles.tabsContainer}>
          <Tabs tabs={tabs} className={styles.tabs} />
        </div>
      )}

      <main className={classNames(styles.content, contentClassName)}>
        {children}
      </main>
    </div>
  );
}