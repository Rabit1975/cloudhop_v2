import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { MeetingRoom } from '@cloudrabbit/hopmeets.entities.meeting-room';
import { MeetingRoomCard } from './meeting-room-card.js';
import styles from './meeting-room-card.module.scss';

describe('MeetingRoomCard', () => {
  const mockRoom = new MeetingRoom('test-id', 'Test Room', 10, false, 'test-owner');

  it('should render the meeting room name', () => {
    const { container } = render(
      <MockProvider>
        <MeetingRoomCard room={mockRoom} />
      </MockProvider>
    );
    const titleElement = container.querySelector(`.${styles.title}`);
    expect(titleElement).toHaveTextContent('Test Room');
  });

  it('should call onEnter when the Enter Room button is clicked', () => {
    const onEnter = vi.fn();
    const { container } = render(
      <MockProvider>
        <MeetingRoomCard room={mockRoom} onEnter={onEnter} />
      </MockProvider>
    );
    const button = container.querySelector(`.${styles.button}`);
    fireEvent.click(button);
    expect(onEnter).toHaveBeenCalledWith('test-id');
  });

  it('should render the capacity correctly', () => {
    const { container } = render(
      <MockProvider>
        <MeetingRoomCard room={mockRoom} />
      </MockProvider>
    );
    const capacityValue = container.querySelector(`.${styles.value}`);
    expect(capacityValue).toHaveTextContent('10 Participants');
  });
});