import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Link } from './link.js';

export const HubNavigation = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--colors-surface-background)', 
          minHeight: '150px' 
        }}>
          <div style={{ marginBottom: 'var(--spacing-medium)' }}>
            <h3 style={{ margin: 0, color: 'var(--colors-text-primary)' }}>CloudHop Navigation</h3>
            <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
              Navigate through the different modules of the platform.
            </p>
          </div>
          <nav style={{ display: 'flex', gap: 'var(--spacing-large)', alignItems: 'center' }}>
            <Link href="/hophub">HopHub</Link>
            <Link href="/hopmeets">HopMeets</Link>
            <Link href="/music">Music Studio</Link>
            <Link href="/spaces">Spaces</Link>
          </nav>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const ExternalIntegrations = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--colors-surface-background)' 
        }}>
          <div style={{ marginBottom: 'var(--spacing-medium)' }}>
            <h3 style={{ margin: 0, color: 'var(--colors-text-primary)' }}>Integrations</h3>
            <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
              Connect with external services and platforms via secure links.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)', maxWidth: '300px' }}>
            <Link href="https://unity.com" external target="_blank">
              Unity Play (External)
            </Link>
            <Link href="https://twitch.tv" external target="_blank">
              Twitch Integration (External)
            </Link>
            <Link href="https://music.youtube.com" external target="_blank">
              YouTube Music (External)
            </Link>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const LinkStates = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          backgroundColor: 'var(--colors-surface-background)' 
        }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: 'var(--colors-text-secondary)', fontSize: '12px', marginBottom: '8px' }}>DEFAULT</p>
              <Link href="/active">Explore Nebula</Link>
            </div>
            
            <div>
              <p style={{ color: 'var(--colors-text-secondary)', fontSize: '12px', marginBottom: '8px' }}>DISABLED</p>
              <Link href="/disabled" disabled>Offline Module</Link>
            </div>
            
            <div>
              <p style={{ color: 'var(--colors-text-secondary)', fontSize: '12px', marginBottom: '8px' }}>NO STYLES (CUSTOM)</p>
              <Link 
                href="/profile" 
                noStyles 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid var(--colors-border-default)', 
                  padding: '8px 16px', 
                  borderRadius: 'var(--borders-radius-full)',
                  color: 'var(--colors-text-primary)',
                  transition: 'background-color 0.2s'
                }}
              >
                <span>UserProfile</span>
                <span style={{ fontSize: '12px' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const VisualCardLink = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
         <div style={{ 
           padding: 'var(--spacing-xl)', 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center',
           backgroundColor: 'var(--colors-surface-background)' 
         }}>
           <Link href="/game-hub" noStyles style={{ textDecoration: 'none' }}>
             <div style={{
               width: '320px',
               backgroundColor: 'var(--colors-surface-primary)',
               borderRadius: 'var(--borders-radius-medium)',
               overflow: 'hidden',
               boxShadow: 'var(--effects-shadows-medium)',
               transition: 'transform 0.2s ease',
               border: '1px solid var(--colors-border-subtle)'
             }}>
               <img 
                 src="https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_illus_0_1770832610451.png" 
                 alt="Game Hub"
                 style={{ width: '100%', height: '180px', objectFit: 'cover' }}
               />
               <div style={{ padding: 'var(--spacing-medium)' }}>
                 <div style={{ 
                   display: 'inline-block', 
                   padding: '4px 8px', 
                   backgroundColor: 'var(--colors-secondary-default)', 
                   color: 'var(--colors-secondary-contrast)', 
                   borderRadius: '4px',
                   fontSize: '10px',
                   fontWeight: 'bold',
                   marginBottom: '8px'
                 }}>
                   NEW
                 </div>
                 <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h6)' }}>
                   GameHub Showcase
                 </h4>
                 <p style={{ margin: 0, color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
                   Dive into the nebula of games.
                 </p>
               </div>
             </div>
           </Link>
         </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};