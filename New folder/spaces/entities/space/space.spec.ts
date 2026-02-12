import { Space } from './space.js';
import { createMockSpace } from './space.mock.js';

describe('Space', () => {
  it('should create a Space instance', () => {
    const space = createMockSpace();
    expect(space).toBeInstanceOf(Space);
  });

  it('should have a from() method', () => {
    expect(Space.from).toBeTruthy();
  });

  it('should have a toObject() method', () => {
    const space = createMockSpace();
    expect(space.toObject).toBeTruthy();
  });
});