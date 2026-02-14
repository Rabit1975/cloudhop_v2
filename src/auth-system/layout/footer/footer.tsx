import React, { type ReactNode, type CSSProperties } from 'react';
import classNames from 'classnames';
import { Link } from '@cloudrabbit/design.navigation.link';
import { Logo } from '@cloudrabbit/design.content.logo';
import type { FooterLinkGroup } from './footer-link-type.js';
import type { FooterSocialLink } from './footer-social-type.js';
import styles from './footer.module.scss';

export type FooterProps = {
  /**
   * Grouped links to be displayed in the footer navigation area.
   */
  linkGroups?: FooterLinkGroup[];

  /**
   * Social media links with icons.
   */
  socialLinks?: FooterSocialLink[];

  /**
   * Copyright text to display at the bottom.
   */
  copyright?: string;

  /**
   * Optional custom logo component.
   */
  logo?: ReactNode;

  /**
   * Slogan text to display below the logo.
   */
  slogan?: string;

  /**
   * Additional class name for the footer.
   */
  className?: string;

  /**
   * Inline styles for the footer.
   */
  style?: CSSProperties;
};

export function Footer({
  linkGroups = [],
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} CloudHop. All rights reserved.`,
  logo,
  slogan = 'Modular Operating System for Next-Gen Communication',
  className,
  style,
}: FooterProps) {
  return (
    <footer className={classNames(styles.footer, className)} style={style}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            {logo || <Logo size={32} minimal={false} />}
            {slogan && <p className={styles.slogan}>{slogan}</p>}
          </div>

          {linkGroups.length > 0 && (
            <nav className={styles.navigation}>
              {linkGroups.map((group, index) => (
                <div key={index} className={styles.linkGroup}>
                  {group.title && <h4 className={styles.groupTitle}>{group.title}</h4>}
                  <div className={styles.links}>
                    {group.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className={styles.linkItem}
                        noStyles
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>{copyright}</p>

          {socialLinks.length > 0 && (
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={styles.socialIcon}
                  noStyles
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}