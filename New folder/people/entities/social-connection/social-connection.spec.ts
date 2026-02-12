import { SocialConnection } from './social-connection.js';
import { mockSocialConnection } from './social-connection.mock.js';

describe('SocialConnection', () => {
  it('should create a SocialConnection instance', () => {
    const socialConnection = mockSocialConnection();
    expect(socialConnection).toBeInstanceOf(SocialConnection);
  });

  it('should create a SocialConnection instance from a plain object', () => {
    const socialConnection = mockSocialConnection();
    const fromObject = SocialConnection.from(socialConnection.toObject());
    expect(fromObject).toBeInstanceOf(SocialConnection);
  });

  it('should have a toObject method that returns a plain object', () => {
    const socialConnection = mockSocialConnection();
    const plainObject = socialConnection.toObject();
    expect(typeof plainObject).toBe('object');
  });
});