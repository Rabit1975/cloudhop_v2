import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { MeetingParticipantList } from './meeting-participant-list.js';
import styles from './meeting-participant-list.module.scss';

const createMockUser = (id: string, name: string, username: string, img?: string): User => {
  return {
    id,
    userId: id,
    username,
    displayName: name,
    email: `${username}@cloudhop.com`,
    roles: [],
    imageUrl: img,
    hasRole: () => false,
    toObject: () => ({
      id,
      userId: id,
      username,
      displayName: name,
      email: `${username}@cloudhop.com`,
      roles: [],
      imageUrl: img
    })
  } as unknown as User;
};

const participants = [
  createMockUser('1', 'Alice Chen', 'achen', "https://example.com/alice.jpg"),
  createMockUser('2', 'Bob Smith', 'bsmith'),
];

describe('MeetingParticipantList', () => {
  it('should render the title', () => {
    const { container } = render(
      <MemoryRouter>
        <MeetingParticipantList participants={participants} title="Attendees" />
      </MemoryRouter>
    );
    const titleElement = container.querySelector(`.${styles.participantList} h2`);
    expect(titleElement?.textContent).toBe('Attendees');
  });

  it('should render a list of participants', () => {
    const { container } = render(
      <MemoryRouter>
        <MeetingParticipantList participants={participants} />
      </MemoryRouter>
    );
    const listItems = container.querySelectorAll(`.${styles.item}`);
    expect(listItems).toHaveLength(participants.length);
  });

  it('should display participant information', () => {
    const { container } = render(
      <MemoryRouter>
        <MeetingParticipantList participants={participants} />
      </MemoryRouter>
    );
    const firstParticipantName = container.querySelector(`.${styles.item} .${styles.name}`);
    expect(firstParticipantName?.textContent).toBe(participants[0].displayName);
  });
});