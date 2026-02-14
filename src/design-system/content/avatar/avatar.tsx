import React, { useState } from 'react';
import classNames from 'classnames';
import { AvatarSize } from './avatar-size-type.js';
import { AvatarStatus } from './avatar-status-type.js';
import styles from './avatar.module.scss';

export type AvatarProps = {
  /**
   * The source URL of the avatar image.
   */
  src?: string;

  /**
   * Alt text for the avatar image.
   */
  alt?: string;

  /**
   * Initials to display when image is not available.
   */
  letters?: string;

  /**
   * Size of the avatar.
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Status indicator to display.
   */
  status?: AvatarStatus;

  /**
   * Additional class name for the root element.
   */
  className?: string;

  /**
   * Additional class name for the image element.
   */
  imageClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Avatar({
  src,
  alt = 'Avatar',
  letters = 'CH',
  size = 'md',
  status,
  className,
  imageClassName,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const showImage = src && !imageError;

  return (
    <div
      className={classNames(styles.avatar, styles[size], className)}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className={classNames(styles.image, imageClassName)}
        />
      ) : (
        <span className={styles.initials}>
          {letters.slice(0, 2)}
        </span>
      )}
      
      {status && (
        <span
          className={classNames(
            styles.statusIndicator,
            styles[size],
            styles[status]
          )}
          role="status"
          aria-label={status}
        />
      )}
    </div>
  );
}