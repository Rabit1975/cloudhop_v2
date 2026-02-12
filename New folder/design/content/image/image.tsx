import React from 'react';
import classNames from 'classnames';
import styles from './image.module.scss';

export type ImageProps = {
  /**
   * The source URL of the image.
   */
  src?: string;

  /**
   * The alternative text of the image.
   */
  alt?: string;

  /**
   * The width of the image.
   */
  width?: number | string;

  /**
   * The height of the image.
   */
  height?: number | string;

  /**
   * Class name for the image.
   */
  className?: string;

  /**
   * Style object for the image.
   */
  style?: React.CSSProperties;
};

const defaultImage = 'https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic_and_sleek_digital_0_1770832602892.png';

export function Image({
  src = defaultImage,
  alt = 'CloudHop visual',
  width,
  height,
  className,
  style,
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classNames(styles.image, className)}
      style={style}
    />
  );
}