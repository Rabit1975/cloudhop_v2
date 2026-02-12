import React, { useMemo } from 'react';
import classNames from 'classnames';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import type { DashboardPanelType } from './dashboard-panel-type.js';
import styles from './dashboard.module.scss';

export type DashboardProps = {
  /**
   * List of panel configurations to display.
   */
  panels?: DashboardPanelType[];

  /**
   * Custom class name for the dashboard container.
   */
  className?: string;

  /**
   * Inline styles for the dashboard container.
   */
  style?: React.CSSProperties;
};

export function Dashboard({ panels, className, style }: DashboardProps) {
  const sortedPanels = useMemo(() => {
    if (!panels) return [];
    return [...panels].sort((a, b) => (a.weight || 0) - (b.weight || 0));
  }, [panels]);

  const hasPanels = sortedPanels.length > 0;

  return (
    <div className={classNames(styles.dashboard, className)} style={style}>
      {hasPanels ? (
        sortedPanels.map((panel) => {
          const PanelComponent = panel.component;
          return (
            <div key={panel.name} className={styles.panelWrapper}>
              <PanelComponent />
            </div>
          );
        })
      ) : (
        <PlaceholderPanels />
      )}
    </div>
  );
}

function PlaceholderPanels() {
  return (
    <>
      <div className={styles.panelWrapper}>
        <PanelCard title="Welcome to CloudHop" variant="nebula">
          <div style={{ padding: 'var(--spacing-medium)', color: 'var(--colors-text-secondary)' }}>
            <div style={{ 
              marginBottom: 'var(--spacing-medium)', 
              fontSize: 'var(--typography-sizes-body-large)',
              color: 'var(--colors-text-primary)' 
            }}>
              Your unified digital workspace.
            </div>
            <p>Connect with your team, stream music, or start a game session directly from this dashboard.</p>
          </div>
        </PanelCard>
      </div>
      <div className={styles.panelWrapper}>
        <PanelCard title="Recent Activity" loading variant="default" />
      </div>
      <div className={styles.panelWrapper}>
        <PanelCard title="System Status" variant="clean">
           <div style={{ padding: 'var(--spacing-medium)' }}>
             <div className={styles.skeletonText} />
             <div className={styles.skeletonText} />
             <div className={classNames(styles.skeletonText, styles.short)} />
           </div>
        </PanelCard>
      </div>
    </>
  );
}