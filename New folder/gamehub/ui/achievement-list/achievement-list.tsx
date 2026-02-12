import React from 'react';
import classNames from 'classnames';
import { Achievement } from '@cloudrabbit/gamehub.entities.achievement';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Icon } from '@cloudrabbit/design.content.icon';
import styles from './achievement-list.module.scss';

export type AchievementListProps = {
  /**
   * The list of achievements to display.
   */
  achievements?: Achievement[];

  /**
   * List of achievement IDs that the user has unlocked.
   */
  unlockedAchievementIds?: string[];

  /**
   * Optional class name for the container.
   */
  className?: string;
};

const TrophyIcon = () => (
  <path d="M20.2 2H15V1c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v1H1.8c-1 0-1.8.82-1.8 1.8v2.4c0 2.2 1.48 4.07 3.53 4.67 1.07 2.29 3.23 3.98 5.87 4.3v2.83H6v2h12v-2h-3.4v-2.83c2.64-.32 4.8-2.01 5.87-4.3C22.52 9.27 24 7.4 24 5.2V3.8c0-.98-.8-1.8-1.8-1.8zM3.8 7.6c0 1.1-.9 2-2 2V4h2v3.6zm10 5.05c-2.4 0-4.4-1.74-4.88-4.05H15.1c-.49 2.31-2.49 4.05-4.89 4.05zm8.2-5.05c-1.1 0-2-.9-2-2V4h2v3.6z" />
);

const LockIcon = () => (
  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
);

const CheckCircleIcon = () => (
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
);

export function AchievementList({
  achievements = [],
  unlockedAchievementIds = [],
  className,
}: AchievementListProps) {
  if (achievements.length === 0) {
    return null;
  }

  return (
    <div className={classNames(styles.achievementList, className)}>
      {achievements.map((achievement) => {
        const isUnlocked = unlockedAchievementIds.includes(achievement.id);
        const {iconUrl} = achievement;

        return (
          <div
            key={achievement.id}
            className={classNames(styles.achievementItem, {
              [styles.unlocked]: isUnlocked,
              [styles.locked]: !isUnlocked,
            })}
          >
            <div className={styles.iconWrapper}>
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={achievement.name}
                  className={styles.achievementIcon}
                />
              ) : (
                <div className={styles.placeholderIcon}>
                  <Icon size={24}>
                    <TrophyIcon />
                  </Icon>
                </div>
              )}
              <div className={styles.statusBadge}>
                <Icon size={14} className={styles.statusIcon}>
                  {isUnlocked ? <CheckCircleIcon /> : <LockIcon />}
                </Icon>
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.header}>
                <Heading
                  element="h4"
                  visualLevel="body-large"
                  className={styles.title}
                >
                  {achievement.name}
                </Heading>
                {achievement.points && (
                  <span className={styles.points}>
                    {achievement.points} pts
                  </span>
                )}
              </div>
              <Paragraph size="small" className={styles.description}>
                {achievement.description}
              </Paragraph>
            </div>
          </div>
        );
      })}
    </div>
  );
}