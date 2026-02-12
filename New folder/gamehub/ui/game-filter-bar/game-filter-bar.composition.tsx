import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import type { SelectOption } from '@cloudrabbit/design.inputs.select-list';
import { GameFilterBar } from './game-filter-bar.js';
import type { GameFilters } from './game-filters-type.js';

const mockGenres: SelectOption[] = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'rpg', label: 'RPG' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'puzzle', label: 'Puzzle' },
  { value: 'racing', label: 'Racing' },
  { value: 'shooter', label: 'Shooter' },
];

export const BasicGameFilterBar = () => {
  const [activeFilters, setActiveFilters] = useState<GameFilters>({});

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '40px', backgroundColor: 'var(--colors-surface-background)', minHeight: '400px' }}>
        <h3 style={{ color: 'var(--colors-text-primary)', marginBottom: '24px' }}>GameHub Filters</h3>
        
        <GameFilterBar 
          genreOptions={mockGenres}
          onFilterChange={setActiveFilters}
        />

        <div style={{ marginTop: '32px', padding: '24px', backgroundColor: 'var(--colors-surface-secondary)', borderRadius: 'var(--borders-radius-medium)' }}>
          <h4 style={{ margin: '0 0 16px', color: 'var(--colors-text-primary)' }}>Active Filters:</h4>
          <pre style={{ margin: 0, color: 'var(--colors-text-secondary)', fontSize: '12px', fontFamily: 'monospace' }}>
            {JSON.stringify(activeFilters, null, 2)}
          </pre>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeFilterBar = () => {
  const [activeFilters, setActiveFilters] = useState<GameFilters>({});

  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '40px', 
        backgroundColor: 'var(--colors-surface-background)', 
        minHeight: '600px',
        backgroundImage: 'var(--effects-gradients-nebula)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        <div style={{
          width: '100%',
          height: '200px',
          backgroundImage: 'url(https://storage.googleapis.com/bit-generated-images/images/image_a_sleek__futuristic_game_filte_0_1770835130819.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'var(--borders-radius-large)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '24px',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ 
            color: 'white', 
            textShadow: '0 2px 4px rgba(0,0,0,0.5)', 
            margin: 0,
            fontSize: 'var(--typography-sizes-display-small)'
          }}>
            Find Your Next Game
          </h1>
        </div>
        
        <GameFilterBar 
          genreOptions={mockGenres}
          onFilterChange={setActiveFilters}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ 
              height: '160px', 
              backgroundColor: 'rgba(30, 41, 59, 0.6)', 
              backdropFilter: 'var(--effects-blur-medium)',
              borderRadius: 'var(--borders-radius-medium)',
              border: '1px solid var(--colors-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              gap: '12px'
            }}>
              <div style={{ 
                height: '80px', 
                backgroundColor: 'var(--colors-surface-secondary)', 
                borderRadius: 'var(--borders-radius-small)',
                width: '100%' 
              }} />
              <div style={{ fontSize: 'var(--typography-sizes-body-large)', color: 'var(--colors-text-primary)', fontWeight: 'bold' }}>
                Cyber Odyssey {i}
              </div>
              <div style={{ fontSize: 'var(--typography-sizes-caption-default)', color: 'var(--colors-text-secondary)' }}>
                RPG • HTML5
              </div>
            </div>
          ))}
        </div>
      </div>
    </CloudrabbitTheme>
  );
};