import React, { ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './nebula-background.module.scss';

export type NebulaBackgroundProps = {
  /**
   * The content to be rendered on top of the nebula background.
   */
  children?: ReactNode;

  /**
   * Additional class name for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: CSSProperties;

  /**
   * Adjusts the intensity of the nebula effect.
   * @default false
   */
  intensified?: boolean;
};

export function NebulaBackground({
  children,
  className,
  style,
  intensified = false,
  ...rest
}: NebulaBackgroundProps) {
  return (
    <div
      className={classNames(styles.root, className)}
      style={style}
      {...rest}
    >
      <div className={styles.nebulaContainer}>
        <div 
          className={styles.gradientLayer} 
          style={{ opacity: intensified ? 0.6 : 0.4 }}
        />
        <div className={styles.secondaryGradient} />
        <div className={styles.starsLayer} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}