import type { ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';
import { Card } from '@cloudrabbit/design.content.card';
import styles from './panel-card.module.scss';

export type PanelCardProps = {
  /**
   * The title of the panel.
   */
  title: string;

  /**
   * Optional icon to display before the title.
   */
  icon?: ReactNode;

  /**
   * Action elements to display in the header (e.g., buttons, menus).
   */
  actions?: ReactNode;

  /**
   * The main content of the panel.
   */
  children?: ReactNode;

  /**
   * Footer content for the panel.
   */
  footer?: ReactNode;

  /**
   * Visual style variant of the panel.
   * 'default' is standard surface, 'nebula' is translucent/glassy, 'clean' is flat.
   * @default 'default'
   */
  variant?: 'default' | 'nebula' | 'clean';

  /**
   * Whether the panel is currently in a loading state.
   * @default false
   */
  loading?: boolean;

  /**
   * Additional class name for the panel container.
   */
  className?: string;

  /**
   * Inline styles for the panel.
   */
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>; // Allow passing standard div attributes to the Card

export function PanelCard({
  title,
  icon,
  actions,
  children,
  footer,
  variant = 'default',
  loading = false,
  className,
  style,
  ...rest
}: PanelCardProps) {
  const getCardVariant = () => {
    switch (variant) {
      case 'nebula':
        return 'glow';
      case 'clean':
        return 'outlined';
      default:
        return 'elevated';
    }
  };

  const headerContent = (
    <div className={styles.headerContent}>
      <div className={styles.titleArea}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={styles.titleText}>{title}</span>
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );

  return (
    <Card
      className={classNames(
        styles.panelCard,
        styles[variant],
        className
      )}
      variant={getCardVariant()}
      header={headerContent}
      footer={footer}
      style={style}
      {...rest}
    >
      {loading ? (
        <div style={{ 
          padding: '24px', 
          textAlign: 'center', 
          color: 'var(--colors-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}>
          Loading module...
        </div>
      ) : (
        children
      )}
    </Card>
  );
}