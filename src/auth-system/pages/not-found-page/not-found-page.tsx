import React from 'react';
import classNames from 'classnames';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Image } from '@cloudrabbit/design.content.image';
import styles from './not-found-page.module.scss';

export type NotFoundPageProps = {
  /**
   * Custom class name for the component.
   */
  className?: string;

  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
};

const notFoundImage = 'https://storage.googleapis.com/bit-generated-images/images/image_a_visually_striking_404_error__0_1770833866636.png';

export function NotFoundPage({ className, style }: NotFoundPageProps) {
  return (
    <div className={classNames(styles.notFoundPage, className)} style={style}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src={notFoundImage}
            alt="404 - Lost in the Nebula"
            width="100%"
            height="auto"
            className={styles.image}
          />
        </div>
        
        <Heading element="h1" visualLevel="display-small" className={styles.title}>
          Lost in the Nebula?
        </Heading>
        
        <Paragraph size="large" className={styles.description}>
          The coordinates you are looking for seem to have drifted into a black hole.
          Let's navigate you back to the main hub.
        </Paragraph>
        
        <Link href="/" className={styles.homeButton} noStyles>
          Return to HopHub
        </Link>
      </div>
    </div>
  );
}