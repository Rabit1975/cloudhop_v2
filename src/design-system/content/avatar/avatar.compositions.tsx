import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Avatar } from './avatar.js';

const avatarImage = 'https://storage.googleapis.com/bit-generated-images/images/image_a_modern__abstract_avatar_icon_0_1770832604911.png';

export const BasicAvatar = () => {
  return (
    <CloudrabbitTheme>
      <Avatar src={avatarImage} alt="User Avatar" />
    </CloudrabbitTheme>
  );
};

export const AvatarSizes = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Avatar src={avatarImage} size="xs" />
        <Avatar src={avatarImage} size="sm" />
        <Avatar src={avatarImage} size="md" />
        <Avatar src={avatarImage} size="lg" />
        <Avatar src={avatarImage} size="xl" />
        <Avatar src={avatarImage} size="xxl" />
      </div>
    </CloudrabbitTheme>
  );
};

export const AvatarStatuses = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Avatar src={avatarImage} status="online" size="lg" />
        <Avatar src={avatarImage} status="busy" size="lg" />
        <Avatar src={avatarImage} status="away" size="lg" />
        <Avatar src={avatarImage} status="offline" size="lg" />
      </div>
    </CloudrabbitTheme>
  );
};

export const AvatarInitials = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar letters="CH" size="lg" style={{ backgroundColor: 'var(--colors-primary-default)', color: 'var(--colors-primary-contrast)' }} />
        <Avatar letters="AB" size="lg" />
        <Avatar letters="JD" size="lg" status="online" />
      </div>
    </CloudrabbitTheme>
  );
};