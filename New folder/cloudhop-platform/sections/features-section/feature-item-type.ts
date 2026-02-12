export type FeatureItem = {
  /**
   * Unique identifier for the feature.
   */
  id: string;

  /**
   * Display title of the feature.
   */
  title: string;

  /**
   * Description text explaining the feature.
   */
  description: string;

  /**
   * URL for the feature's cover image.
   */
  imageSrc: string;

  /**
   * Alt text for the image.
   */
  imageAlt?: string;

  /**
   * Navigation path for the feature.
   */
  href: string;

  /**
   * Label for the action link.
   */
  actionLabel?: string;
};