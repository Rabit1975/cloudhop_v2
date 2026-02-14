import React from 'react';
import classNames from 'classnames';
import { SectionLayout } from '@cloudrabbit/design.layouts.section-layout';
import { Card } from '@cloudrabbit/design.content.card';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Link } from '@cloudrabbit/design.navigation.link';
import type { FeatureItem } from './feature-item-type.js';
import styles from './features-section.module.scss';

export type FeaturesSectionProps = {
  /**
   * List of features to display.
   */
  features?: FeatureItem[];

  /**
   * Title of the section.
   */
  title?: string;

  /**
   * Subtitle of the section.
   */
  subtitle?: string;

  /**
   * Caption of the section.
   */
  caption?: string;

  /**
   * Custom class name for the section container.
   */
  className?: string;
};

const defaultFeatures: FeatureItem[] = [
  {
    id: 'hophub',
    title: 'HopHub',
    description: 'Real-time chat with groups and channels like Telegram and Discord. Stay connected with your community through seamless instant messaging.',
    imageSrc: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g248573eb7cd50bf449579f9438cbe01c94c7af3237d7da180012c0cbabd2402b5660d32d32d14d65268546278e9323aafe9a2538a2a77e498f1efef17e6dbfee_1280.jpg',
    imageAlt: 'Abstract digital network visualization representing connectivity',
    href: '/hophub',
    actionLabel: 'Enter Hub',
  },
  {
    id: 'hopmeets',
    title: 'HopMeets',
    description: 'Video conferencing and meeting rooms in high definition. Experience zero-latency communication for work or social hangouts.',
    imageSrc: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g9de20312bd0aa377b38a9b52734c21420ee7fbb428ead0acd4817ce9dd4e00ca31f5755bb4b5cd1982734c2776944e791f550acfd6eda0c50cf596039293b46c_1280.jpg',
    imageAlt: 'Futuristic interface display for video communication',
    href: '/hopmeets',
    actionLabel: 'Start Meeting',
  },
  {
    id: 'music',
    title: 'Music Studio',
    description: 'Integrated YouTube Music streaming and collaborative music studio. Listen together or create your next masterpiece.',
    imageSrc: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g565b2c5bdfd20a7d1c0c375b4d4935c2f76bb83d7b3016f135b23ba61bb54ba760b90f892d7ff2918cdb8a25a8ea4dd352e34a097169598ef92c8c89bd9f6e66_1280.jpg',
    imageAlt: 'Abstract sound waves and digital audio visualization',
    href: '/music',
    actionLabel: 'Listen Now',
  },
  {
    id: 'spaces',
    title: 'Spaces',
    description: 'Creative tools with AI integration. A dedicated environment for content creation, brainstorming, and digital art.',
    imageSrc: 'https://storage.googleapis.com/bit-generated-images/images/image_a_visually_stunning__futuristi_0_1770835241471.png',
    imageAlt: 'Futuristic space station interior representing creative workspace',
    href: '/spaces',
    actionLabel: 'Create Space',
  },
  {
    id: 'gamehub',
    title: 'GameHub',
    description: 'Showcase for HTML5 and Unity games. Play, stream via Twitch integration, and discover new indie titles.',
    imageSrc: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gcf23c3fb087f3ce7b0a1c90cf85203008dc46b8f285e222f4b65047020f52cda9af784be199e05512cf05dcf5e21a8172447e3fbb931f0b67c209ed377feee79_1280.jpg',
    imageAlt: 'Cyberpunk city street representing gaming world',
    href: '/gamehub',
    actionLabel: 'Play Games',
  },
];

export function FeaturesSection({
  features = defaultFeatures,
  title = 'Modular Operating System',
  subtitle = 'CloudHop combines real-time chat, video meetings, music, and gaming into a unified digital experience.',
  caption = 'Platform Features',
  className,
}: FeaturesSectionProps) {
  return (
    <SectionLayout
      title={title}
      subtitle={subtitle}
      caption={caption}
      align="center"
      className={classNames(styles.featuresSection, className)}
    >
      <div className={styles.grid}>
        {features.map((feature) => (
          <div key={feature.id} className={styles.cardWrapper}>
            <Card
              variant="glow"
              interactive
              image={feature.imageSrc}
              imageAlt={feature.imageAlt}
              title={feature.title}
              style={{ height: '100%' }}
              footer={
                <div className={styles.cardFooter}>
                  <Link href={feature.href} className={styles.link} noStyles>
                    {feature.actionLabel || 'Explore'} <span>&rarr;</span>
                  </Link>
                </div>
              }
            >
              <Paragraph size="medium" style={{ color: 'var(--colors-text-secondary)' }}>
                {feature.description}
              </Paragraph>
            </Card>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}