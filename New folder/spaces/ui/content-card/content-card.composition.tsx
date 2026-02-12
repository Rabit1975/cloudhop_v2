import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockContent } from '@cloudrabbit/spaces.entities.content';
import { ContentCard } from './content-card.js';

const SAMPLE_IMAGE = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_content_card__0_1770833866309.png";

export const DocumentCard = () => {
  const content = mockContent({
    title: 'Nebula Protocol Guidelines',
    body: 'A comprehensive document outlining the communication protocols within the CloudHop ecosystem. Essential for all new Space administrators.',
    type: 'document',
  });

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '340px' }}>
          <ContentCard content={content} href="/spaces/docs/1" />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const VisualAssetCard = () => {
  const content = mockContent({
    title: 'Space Station Concepts',
    body: 'Early concept art sketches for the new orbital hub environment in GameHub.',
    type: 'image',
  });

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '32px', maxWidth: '340px' }}>
          <ContentCard 
            content={content} 
            href="/spaces/assets/2" 
            thumbnailUrl={SAMPLE_IMAGE}
          />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const ContentGrid = () => {
  const list = [
    mockContent({ 
      title: 'Q4 Roadmap', 
      type: 'document', 
      body: 'Strategic goals and milestones for the upcoming quarter.' 
    }),
    mockContent({ 
      title: 'Interface Mockups', 
      type: 'design', 
      body: 'High-fidelity designs for the new chat interface.' 
    }),
    mockContent({ 
      title: 'User Feedback', 
      type: 'document', 
      body: 'Aggregated feedback from the beta testing phase.' 
    }),
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
              key={idx} 
              content={item} 
              href={`/spaces/content/${idx}`} 
            />
          ))}
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkModeContent = () => {
  const content = mockContent({
    title: 'Dark Matter Theory',
    body: 'Exploring the unseen digital forces that bind our community spaces together.',
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