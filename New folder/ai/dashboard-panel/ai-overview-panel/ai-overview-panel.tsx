import React from 'react';
import classNames from 'classnames';
import { PanelCard } from '@cloudrabbit/cloudhop-platform.ui.panel-card';
import { AiIcon } from '@cloudrabbit/ai.icons.ai-icon';
import { Button } from '@cloudrabbit/design.actions.button';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import styles from './ai-overview-panel.module.scss';

export type AiOverviewPanelProps = {
  /**
   * Additional class name for the panel.
   */
  className?: string;

  /**
   * Inline styles for the panel.
   */
  style?: React.CSSProperties;

  /**
   * Custom title for the panel.
   * @default "AI Studio"
   */
  title?: string;

  /**
   * Custom description text.
   */
  description?: string;
};

export function AiOverviewPanel({
  className,
  style,
  title = 'AI Studio',
  description = 'Unlock your creative potential with CloudHop AI. Generate text, art, and code instantly.',
}: AiOverviewPanelProps) {
  return (
    <PanelCard
      title={title}
      icon={<AiIcon className={styles.icon} />}
      className={classNames(styles.panel, className)}
      style={style}
      footer={
        <div className={styles.footer}>
          <Button href="/ai" appearance="primary" className={styles.cta}>
            Open AI Hub
          </Button>
        </div>
      }
    >
      <div className={styles.content}>
        <Paragraph size="small" className={styles.description}>
          {description}
        </Paragraph>
        <div className={styles.imageContainer}>
          <img
            src="https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_art_represent_0_1770835236019.png"
            alt="AI Visualization"
            className={styles.image}
            loading="lazy"
          />
        </div>
      </div>
    </PanelCard>
  );
}