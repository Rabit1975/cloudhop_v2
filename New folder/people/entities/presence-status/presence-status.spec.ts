import { PresenceStatus } from './presence-status.js';

describe('PresenceStatus', () => {
  it('should create a PresenceStatus instance', () => {
    const presenceStatus = new PresenceStatus(
      'user123',
      'online',
      new Date().toISOString()
    );
    expect(presenceStatus).toBeInstanceOf(PresenceStatus);
  });

  it('should return the correct id', () => {
    const presenceStatus = new PresenceStatus(
      'user123',
      'online',
      new Date().toISOString()
    );
    expect(presenceStatus.id).toBe('user123');
  });

  it('has a PresenceStatus.from() method', () => {
    expect(PresenceStatus.from).toBeTruthy();
  });
});