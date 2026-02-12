import { MusicStudioProject } from './music-studio-project.js';
import { mockMusicStudioProjects } from './music-studio-project.mock.js';

describe('MusicStudioProject', () => {
  it('has a MusicStudioProject.from() method', () => {
    expect(MusicStudioProject.from).toBeTruthy();
  });

  it('should create a MusicStudioProject instance from a plain object', () => {
    const mockProjects = mockMusicStudioProjects();
    const project = mockProjects[0];
    expect(project).toBeInstanceOf(MusicStudioProject);
  });

  it('should serialize a MusicStudioProject instance to a plain object', () => {
    const mockProjects = mockMusicStudioProjects();
    const project = mockProjects[0];
    const plainObject = project.toObject();
    expect(typeof plainObject.id).toBe('string');
    expect(typeof plainObject.name).toBe('string');
  });
});