import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { FeaturedSearchSection } from './featured-search-section.js';

export const DefaultFeaturedSearch = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '40px' }}>
          <FeaturedSearchSection />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const CustomTitleAndSubtitle = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '40px' }}>
          <FeaturedSearchSection
            title="Find Your Squad"
            subtitle="Connect with gamers, developers, and creators instantly."
            caption="Community Search"
          />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const FullWidthDisplay = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <FeaturedSearchSection />
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};