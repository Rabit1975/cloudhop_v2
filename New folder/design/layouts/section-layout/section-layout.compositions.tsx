import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { SectionLayout } from './section-layout.js';

export const BasicSection = () => {
  return (
    <CloudrabbitTheme>
      <SectionLayout
        caption="HopHub Features"
        title="Connect with your Community"
        subtitle="Real-time group chat, channels, and direct messaging all in one place. Experience the next generation of social interaction."
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              padding: '24px',
              backgroundColor: 'var(--colors-surface-primary)',
              borderRadius: 'var(--borders-radius-medium)',
              border: '1px solid var(--colors-border-subtle)'
            }}>
              <Heading element="h4">Feature {i}</Heading>
              <p style={{ color: 'var(--colors-text-secondary)', marginTop: '8px' }}>
                Seamless integration with your favorite tools and services.
              </p>
            </div>
          ))}
        </div>
      </SectionLayout>
    </CloudrabbitTheme>
  );
};

export const CenterAlignedWithImage = () => {
  return (
    <CloudrabbitTheme>
      <SectionLayout
        align="center"
        caption="Unified Experience"
        title="Experience the Nebula"
        subtitle="The nebula background creates visual distinction for the social hub while keeping other sections focused and distraction-free."
      >
        <div style={{
          width: '100%',
          borderRadius: 'var(--borders-radius-large)',
          overflow: 'hidden',
          boxShadow: 'var(--effects-shadows-large)',
          marginTop: '16px'
        }}>
          <img
            src="https://storage.googleapis.com/bit-generated-images/images/image_a_futuristic__minimalist_abstr_0_1770833866348.png"
            alt="Futuristic Abstract"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </SectionLayout>
    </CloudrabbitTheme>
  );
};

export const DarkModeVariant = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '100vh'
      }}>
        <SectionLayout
          caption="HopMeets"
          title="Video Conferencing Evolved"
          subtitle="Crystal clear HD video meetings with zero latency. Share your screen, collaborate on documents, and more."
        >
          <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
             <div style={{
               flex: 1,
               minWidth: '300px',
               padding: '32px',
               background: 'var(--effects-gradients-surface)',
               borderRadius: 'var(--borders-radius-large)',
               boxShadow: 'var(--effects-shadows-glow)',
               border: '1px solid var(--colors-border-subtle)'
             }}>
               <Heading element="h3" visualLevel="h4" inverseColor>Pro Audio</Heading>
               <p style={{ color: 'var(--colors-text-secondary)' }}>High fidelity audio processing for musicians and creators.</p>
             </div>
             <div style={{
               flex: 1,
               minWidth: '300px',
               padding: '32px',
               background: 'var(--effects-gradients-surface)',
               borderRadius: 'var(--borders-radius-large)',
               boxShadow: 'var(--effects-shadows-glow)',
               border: '1px solid var(--colors-border-subtle)'
             }}>
               <Heading element="h3" visualLevel="h4" inverseColor>4K Streaming</Heading>
               <p style={{ color: 'var(--colors-text-secondary)' }}>Stream your gameplay or creative process in stunning quality.</p>
             </div>
          </div>
        </SectionLayout>
      </div>
    </CloudrabbitTheme>
  );
};