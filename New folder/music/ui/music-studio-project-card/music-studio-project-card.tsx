import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Card } from '@cloudrabbit/design.content.card';
import { Button } from '@cloudrabbit/design.actions.button';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';
import styles from './music-studio-project-card.module.scss';

export type MusicStudioProjectCardProps = {
  /**
   * The music studio project to display.
   */
  project: MusicStudioProject;

  /**
   * Additional class name for the card.
   */
  className?: string;

  /**
   * Inline styles for the card.
   */
  style?: React.CSSProperties;
};

export function MusicStudioProjectCard({
  project,
  className,
  style,
}: MusicStudioProjectCardProps) {
  const navigate = useNavigate();
  const { id, name, lastEditedAt, layers } = project.toObject();

  const handleCardClick = (e: MouseEvent) => {
    // Prevent navigation if clicking interactive elements inside the card
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    navigate(`/music/studio?projectId=${id}`);
  };

  const formattedDate = new Date(lastEditedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      className={classNames(styles.musicStudioProjectCard, className)}
      style={style}
      title={name}
      interactive
      onClick={handleCardClick}
      footer={
        <div className={styles.footer}>
          <div className={styles.stats}>
            <span className={styles.statsLabel}>Layers</span>
            <span className={styles.statsValue}>{layers.length}</span>
          </div>
          <Button
            appearance="secondary"
            href={`/music/studio?projectId=${id}`}
            className={styles.editButton}
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </Button>
        </div>
      }
    >
      <div className={styles.content}>
        <Paragraph size="small" className={styles.meta}>
          Last edited {formattedDate}
        </Paragraph>
      </div>
    </Card>
  );
}