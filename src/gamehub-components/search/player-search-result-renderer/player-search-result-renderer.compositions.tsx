import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { PlayerSearchResultRenderer } from './player-search-result-renderer.js';
import type { PlayerContent } from './player-content-type.js';

const defaultCompositionAvatarUrl = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_avatar_for_a__0_1770833865266.png";

// Helper to create PlayerContent with required PlainSearchableContent fields
const createPlayerContent = (
  userId: string,
  username: string,
  displayName?: string,
  statusMessage?: string,
  presenceStatus?: 'online' | 'busy' | 'away' | 'offline',
  avatarUrl?: string
): PlayerContent => {
  const name = displayName || username;
  const profileUrl = `/profile?userId=${userId}`;
  return {
    id: `player-${userId}`, 
    type: 'player', 
    title: name, 
    url: profileUrl, 

    userId,
    username,
    displayName,
    avatarUrl,
    statusMessage,
    presenceStatus,
  };
};

const basicPlayer = {
  id: 'res-1',
  relevanceScore: 0.95,
  content: createPlayerContent(
    'u-1',
    'cosmic_traveler',
    'Cosmic Traveler',
    'Drifting through the nebula...',
    'online',
    defaultCompositionAvatarUrl
  ),
};

export const BasicPlayerResult = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', maxWidth: '400px' }}>
          <PlayerSearchResultRenderer result={basicPlayer} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const PlayerStatusVariations = () => {
  const players = [
    {
      id: 'res-online',
      relevanceScore: 1,
      content: createPlayerContent(
        'u-2',
        'star_pilot',
        'Star Pilot',
        'Ready for takeoff',
        'online',
        defaultCompositionAvatarUrl
      ),
    },
    {
      id: 'res-busy',
      relevanceScore: 0.8,
      content: createPlayerContent(
        'u-3',
        'code_wizard',
        'Code Wizard',
        'In a meeting',
        'busy',
        defaultCompositionAvatarUrl
      ),
    },
    {
      id: 'res-offline',
      relevanceScore: 0.5,
      content: createPlayerContent(
        'u-4',
        'ghost_runner',
        'Ghost Runner',
        'Last seen yesterday',
        'offline',
        defaultCompositionAvatarUrl
      ),
    },
  ];

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {players.map((player) => (
            <PlayerSearchResultRenderer key={player.id} result={player} />
          ))}
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const MinimalAndLongContent = () => {
  const minimalPlayer = {
    id: 'res-min',
    relevanceScore: 0.7,
    content: createPlayerContent(
      'u-min',
      'anonymous_void',
      undefined, // No display name
      undefined, // No status message
      'away',
      undefined // No avatar URL
    ),
  };

  const verbosePlayer = {
    id: 'res-max',
    relevanceScore: 0.9,
    content: createPlayerContent(
      'u-max',
      'storyteller_prime',
      'The Great Storyteller of the Northern Quadrant',
      'Writing the history of the CloudHop universe, one pixel at a time. Do not disturb unless it is urgent or you have coffee.',
      'online',
      defaultCompositionAvatarUrl
    ),
  };

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ padding: '24px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PlayerSearchResultRenderer result={minimalPlayer} />
          <PlayerSearchResultRenderer result={verbosePlayer} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkThemeList = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{
          padding: '48px',
          backgroundColor: 'var(--colors-surface-background)',
          minHeight: '300px'
        }}>
          <h3 style={{ color: 'var(--colors-text-primary)', marginBottom: '24px' }}>Search Results</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            <PlayerSearchResultRenderer result={basicPlayer} />
            <PlayerSearchResultRenderer
              result={{
                id: 'res-dark-2',
                relevanceScore: 0.88,
                content: createPlayerContent(
                  'u-dark',
                  'night_owl',
                  'Night Owl',
                  'Coding in the dark',
                  'away',
                  defaultCompositionAvatarUrl
                ),
              }}
            />
          </div>
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};