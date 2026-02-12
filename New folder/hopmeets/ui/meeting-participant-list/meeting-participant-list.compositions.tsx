import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { MeetingParticipantList } from './meeting-participant-list.js';

// Mock data creation helper since we can't instantiate User class directly in all envs without full package
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

const avatar1 = "https://storage.googleapis.com/bit-generated-images/images/image_professional_and_friendly_head_0_1770835141268.png";
const avatar2 = "https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/gf53a9e6a9f610dcd4d29999a5ab71e1a285e4dd37c8ab5378d4d685ea073f4d1434392330e1f1c14c7d079883e099c9f3d4842c8b325de8ac1b63171d61e7594_1280.jpg";
const avatar3 = "https://res.cloudinary.com/ddnr1ptva/image/upload/f_auto,q_auto/ai-images/get/g0195ccfa4ca095e5fadf19439aa88b041e63c3cea36ecdbe01539f8e115eb324c55773fdce54b9b6828931a530df0c34c4b5994feb63e0c04b1bc90d6b6f4e0e_1280.jpg";

const participants = [
  createMockUser('1', 'Alice Chen', 'achen', avatar1),
  createMockUser('2', 'Bob Smith', 'bsmith', avatar2),
  createMockUser('3', 'Charlie Davis', 'cdavis', avatar3),
  createMockUser('4', 'Diana Prince', 'dprince'), // No image
  createMockUser('5', 'Evan Wright', 'ewright'),
];

export const BasicParticipantList = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <MeetingParticipantList participants={participants} />
      </div>
    </CloudrabbitTheme>
  );
};

export const CustomTitleAndEmptyList = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '24px', backgroundColor: 'var(--colors-surface-background)' }}>
        <MeetingParticipantList participants={[]} title="Waiting for attendees..." />
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeList = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '24px', 
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '100vh'
      }}>
        <MeetingParticipantList participants={participants} title="Dark Mode Participants" />
      </div>
    </CloudrabbitTheme>
  );
};