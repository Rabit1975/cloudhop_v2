import { DirectMessage } from './direct-message.js';

describe('DirectMessage', () => {
  it('should create a DirectMessage instance from a plain object', () => {
    const plainObject = {
      id: '123',
      participantIds: ['user1', 'user2'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const directMessage = DirectMessage.from(plainObject);

    expect(directMessage).toBeInstanceOf(DirectMessage);
    expect(directMessage.id).toBe(plainObject.id);
  });

  it('should serialize a DirectMessage instance to a plain object', () => {
    const id = '456';
    const participantIds = ['user3', 'user4'];
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const directMessage = new DirectMessage(id, participantIds, createdAt, updatedAt);
    const plainObject = directMessage.toObject();

    expect(plainObject.id).toBe(id);
    expect(plainObject.participantIds).toEqual(participantIds);
    expect(plainObject.createdAt).toBe(createdAt);
    expect(plainObject.updatedAt).toBe(updatedAt);
  });
});