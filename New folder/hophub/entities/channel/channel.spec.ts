import { Channel } from './channel.js';
import { mockChannelList } from './channel.mock.js';

describe('Channel', () => {
  it('should create a Channel instance from a plain object', () => {
    const plainChannel = mockChannelList[0];
    const channel = Channel.from(plainChannel);
    expect(channel).toBeInstanceOf(Channel);
  });

  it('should serialize a Channel instance to a plain object', () => {
    const plainChannel = mockChannelList[0];
    const channel = Channel.from(plainChannel);
    const serialized = channel.toObject();
    expect(serialized).toEqual(plainChannel);
  });

  it('has a Channel.from() method', () => {
    expect(Channel.from).toBeTruthy();
  });
});