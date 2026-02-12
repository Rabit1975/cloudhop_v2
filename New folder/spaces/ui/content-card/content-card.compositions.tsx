import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Added MemoryRouter import
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockContent } from '@cloudrabbit/spaces.entities.content';
import { ContentCard } from './content-card.js';

const SAMPLE_IMAGE = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_content_card__0_1770833866309.png";

export const BasicContentCard = () => {
  const content = mockContent({
    title: 'Project Nebula Overview',
    body: 'A comprehensive guide to the new Nebula design system features and implementation details for the Space team.',
    type: 'document'
  });

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '340px' }}>
          <ContentCard content={content} href="/spaces/content/123" />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const VisualContentCard = () => {
  const content = mockContent({
    title: 'Space Station Blueprints',
    body: 'Early concept art for the upcoming Space Station environment in GameHub.',
    type: 'design'
  });

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '340px' }}>
          <ContentCard 
            content={content} 
            href="/spaces/content/design-456" 
            thumbnailUrl={SAMPLE_IMAGE} // Changed imageSrc to thumbnailUrl
          />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const GridDisplay = () => {
  const list = [
    mockContent({ title: 'Meeting Notes', type: 'document', body: 'Sync regarding the Q4 roadmap and quarterly goals.' }),
    mockContent({ title: 'Logo Assets', type: 'image', body: 'Final exports of the CloudHop logo in SVG and PNG formats.' }),
    mockContent({ title: 'User Research', type: 'document', body: 'Findings from the latest round of user interviews conducted in March.' }),
  ];

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: '32px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px',
          backgroundColor: 'var(--colors-surface-background)' 
        }}>
          {list.map((item, idx) => (
            <ContentCard 
              key={item.toObject().id || idx} 
              content={item} 
              href={`/spaces/content/${idx}`} 
            />
          ))}
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeCard = () => {
  const content = mockContent({
    title: 'Dark Matter Theory',
    body: 'Exploring the unseen forces that bind our digital universe together.',
    type: 'article'
  });

  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          padding: '48px', 
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ width: '320px' }}>
            <ContentCard content={content} href="#" />
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};