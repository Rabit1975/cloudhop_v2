import React from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Logo } from '@cloudrabbit/design.content.logo';
import { Footer } from './footer.js';

// Simple SVG Icons for composition
const Icons = {
  Twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  GitHub: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  ),
  Discord: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
  ),
  YouTube: (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.58 5.49a2.71 2.71 0 0 0-1.9-1.91C18 3 12 3 12 3s-6 0-7.68.58a2.71 2.71 0 0 0-1.9 1.91C2 7.17 2 12 2 12s0 4.83.42 6.51a2.71 2.71 0 0 0 1.9 1.91c1.68.58 7.68.58 7.68.58s6 0 7.68-.58a2.71 2.71 0 0 0 1.9-1.91C22 16.83 22 12 22 12s0-4.83-.42-6.51zM10 15.46V8.54l5.98 3.46L10 15.46z" />
    </svg>
  ),
};

const defaultLinkGroups = [
  {
    title: 'Platform',
    links: [
      { label: 'HopHub', href: '/hophub' },
      { label: 'HopMeets', href: '/hopmeets' },
      { label: 'Music', href: '/music' },
      { label: 'Spaces', href: '/spaces' },
      { label: 'GameHub', href: '/gamehub' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Community', href: '/community' },
      { label: 'Help Center', href: '/help' },
      { label: 'Partners', href: '/partners' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Brand Kit', href: '/brand' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Settings', href: '/cookies' },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <Icons.Twitter />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <Icons.Discord />, href: 'https://discord.com', label: 'Discord' },
  { icon: <Icons.GitHub />, href: 'https://github.com', label: 'GitHub' },
  { icon: <Icons.YouTube />, href: 'https://youtube.com', label: 'YouTube' },
];

export const DefaultFooter = () => {
  return (
    <MockProvider>
      <Footer 
        linkGroups={defaultLinkGroups}
        socialLinks={defaultSocialLinks}
      />
    </MockProvider>
  );
};

export const SimpleFooter = () => {
  return (
    <MockProvider>
      <Footer 
        logo={<Logo size={24} minimal />}
        copyright="© 2024 CloudHop"
      />
    </MockProvider>
  );
};

export const DarkThemeFooter = () => {
  return (
    <MockProvider>
      <div style={{ backgroundColor: '#0f172a', color: '#e2e8f0', minHeight: '300px' }}>
        <Footer 
          linkGroups={defaultLinkGroups}
          socialLinks={defaultSocialLinks}
          logo={<Logo name="CloudHop" slogan="Nebula Edition" size={32} />}
          style={{ 
            backgroundColor: 'rgba(15, 23, 42, 0.95)', 
            borderTop: '1px solid rgba(255,255,255,0.1)' 
          }}
        />
      </div>
    </MockProvider>
  );
};