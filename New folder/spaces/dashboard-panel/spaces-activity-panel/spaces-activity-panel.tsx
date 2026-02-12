import React from 'react';
import classNames from 'classnames';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import { Link } from '@cloudrabbit/design.navigation.link';
import { SpaceIcon } from '@cloudrabbit/spaces.icons.space-icon';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { useListSpaces } from '@cloudrabbit/spaces.hooks.use-spaces';
import type { Space } from '@cloudrabbit/spaces.entities.space';
import styles from './spaces-activity-panel.module.scss';

export type SpacesActivityPanelProps = {
  /**
   * Additional class name for the panel.
   */
  className?: string;

  /**
   * Inline styles for the panel.
   */
  style?: React.CSSProperties;

  /**
   * Number of spaces to display.
   * @default 5
   */
  limit?: number;

  /**
   * Mock data for preview or testing purposes.
   */
  mockData?: Space[];

  /**
   * Visual variant of the panel.
   * @default 'default'
   */
  variant?: 'default' | 'nebula' | 'clean';
};

export function SpacesActivityPanel({
  className,
  style,
  limit = 5,
  mockData,
  variant = 'default',
}: SpacesActivityPanelProps) {
  const { spaces, loading } = useListSpaces({ limit }, { mockData });

  const footer = (
    <div className={styles.footer}>
      <Link href="/spaces" className={styles.viewAllLink}>
        View All Spaces
      </Link>
    </div>
  );

  return (
    <PanelCard
      title="Spaces Activity"
      icon={<SpaceIcon className={styles.icon} />}
      className={classNames(styles.spacesActivityPanel, className)}
      style={style}
      variant={variant}
      footer={footer}
      loading={loading}
    >
      <div className={styles.content}>
        <Paragraph size="small" className={styles.description}>
          Recent updates from your communities and creative hubs.
        </Paragraph>

        <div className={styles.list}>
          {spaces?.map((space) => (
            <Link
              key={space.id}
              href={`/spaces/${space.id}`}
              noStyles
              className={styles.item}
            >
              <div className={styles.itemContent}>
                <div className={styles.spaceInfo}>
                  <span className={styles.spaceName}>{space.name}</span>
                  <div className={styles.spaceMeta}>
                    <span className={classNames(styles.statusIndicator, styles[space.visibility])} />
                    <span>{space.members?.length || 0} members</span>
                  </div>
                </div>
                <div className={styles.arrow}>→</div>
              </div>
            </Link>
          ))}
          {!loading && (!spaces || spaces.length === 0) && (
            <div className={styles.empty}>
              <Paragraph size="small" className={styles.emptyText}>
                No recent activity found.
              </Paragraph>
              <Link href="/spaces/create" className={styles.createLink}>
                Create a Space
              </Link>
            </div>
          )}
        </div>
      </div>
    </PanelCard>
  );
}