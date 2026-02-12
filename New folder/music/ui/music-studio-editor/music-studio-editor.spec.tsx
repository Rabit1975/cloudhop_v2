import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MusicStudioProject } from '@cloudrabbit/music.entities.music-studio-project';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { vi } from 'vitest';
import { MusicStudioEditor } from './music-studio-editor.js';

describe('MusicStudioEditor', () => {
  const createMockTrack = (id: string, title: string, duration: number) => {
    return new MusicTrack(
      id,
      title,
      duration,
      'upload',
      `source-${id}`,
      true,
      new Date().toISOString()
    );
  };

  const mockProject = new MusicStudioProject(
    'project-1',
    'Neon Nights Remix',
    'user-1',
    new Date().toISOString(),
    [
      createMockTrack('track-1', 'Synth Lead', 45),
      createMockTrack('track-2', 'Bass Line', 60),
      createMockTrack('track-3', 'Drum Kit 808', 120),
      createMockTrack('track-4', 'Ambient Pad', 90),
    ]
  );
  it('should render project title when project is provided', () => {
    render(
      <MemoryRouter>
        <CloudrabbitTheme>
          <MusicStudioEditor project={mockProject} />
        </CloudrabbitTheme>
      </MemoryRouter>
    );
    const projectTitle = screen.getByText('Neon Nights Remix');
    expect(projectTitle).toBeInTheDocument();
  });

  it('should call onSave when save button is clicked', () => {
    const onSave = vi.fn();
    render(
      <MemoryRouter>
        <CloudrabbitTheme>
          <MusicStudioEditor project={mockProject} onSave={onSave} />
        </CloudrabbitTheme>
      </MemoryRouter>
    );
    const saveButton = screen.getByText('Save Project');
    saveButton.click();
    expect(onSave).toHaveBeenCalled();
  });

  it('should render "Untitled Project" when no project is provided', () => {
    render(
      <MemoryRouter>
        <CloudrabbitTheme>
          <MusicStudioEditor />
        </CloudrabbitTheme>
      </MemoryRouter>
    );
    const projectTitle = screen.getByText('Untitled Project');
    expect(projectTitle).toBeInTheDocument();
  });
});