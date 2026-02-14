import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { FeaturesSection } from './features-section.js';

export const DefaultFeaturesSection = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <FeaturesSection />
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeFeatures = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <FeaturesSection 
          title="Experience the Nebula"
          subtitle="A dark mode optimized interface designed for gamers and creators."
        />
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const CustomContentFeatures = () => {
  const customFeatures = [
    {
      id: 'custom-1',
      title: 'Enterprise Security',
      description: 'End-to-end encryption for all your corporate communications.',
      imageSrc: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g08c6ddf6ca8eb1627947d83883738e67dee619d6174375a12fd6e92c0b99963ad81f3d64e1b5fe0691ce96dd20de1acbcd15359f9f55f41e34261d2484c1a411_1280.jpg',
      href: '/security',
      actionLabel: 'Learn More',
    },
    {
      id: 'custom-2',
      title: 'Global Infrastructure',
      description: 'Low latency servers distributed across 15 regions worldwide.',
      imageSrc: 'https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g7c987116b65fec4560aa4838b0f46e58b167921198f9c76380a7170b298076685fe4c74484378f8ac1ae3b0d0bfb8553ebd9fd2cb609f74761e06c9fd9a72b60_1280.jpg',
      href: '/infrastructure',
      actionLabel: 'View Map',
    }
  ];

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <FeaturesSection 
          features={customFeatures}
          title="Enterprise Solutions"
          subtitle="Built for scale and reliability."
          caption="For Business"
        />
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};