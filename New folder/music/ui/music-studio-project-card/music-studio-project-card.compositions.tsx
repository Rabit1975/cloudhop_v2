import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { mockMusicStudioProjects } from '@cloudrabbit/music.entities.music-studio-project';
import { MusicStudioProjectCard } from './music-studio-project-card.js';

const mockProject = mockMusicStudioProjects()[0]; // Get the first project from the array

export const BasicUsage = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ maxWidth: '360px', padding: '24px' }}>
          <MusicStudioProjectCard project={mockProject} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const DarkMode = () => {
  return (
    <MemoryRouter>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{ 
          maxWidth: '360px', 
          padding: '24px',
          backgroundColor: 'var(--colors-surface-background)',
          backgroundImage: 'var(--effects-gradients-nebula)',
          minHeight: '250px',
          borderRadius: 'var(--borders-radius-medium)'
        }}>
          <MusicStudioProjectCard project={mockProject} />
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};

export const ProjectGrid = () => {
  // Use mockMusicStudioProjects() to get an array of projects
  const projects = mockMusicStudioProjects();

  return (
    <MemoryRouter>
      <CloudrabbitTheme>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px', 
          padding: '24px',
          backgroundColor: 'var(--colors-surface-background)'
        }}>
          {projects.map((p) => (
            <MusicStudioProjectCard key={p.id} project={p} />
          ))}
        </div>
      </CloudrabbitTheme>
    </MemoryRouter>
  );
};