import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { TextInput } from './text-input.js';

const containerStyle = {
  padding: '40px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '24px',
  maxWidth: '400px',
  backgroundColor: 'var(--colors-surface-background)',
};

export const BasicInput = () => {
  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <TextInput placeholder="Enter text..." label="Basic Input" />
      </div>
    </CloudrabbitTheme>
  );
};

export const InputWithLabelAndPlaceholder = () => {
  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <TextInput
          id="email-input"
          label="Email Address"
          placeholder="user@example.com"
          type="email"
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const InputWithError = () => {
  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <TextInput
          label="Username"
          value="taken_username"
          error="This username is already taken"
          onChange={() => {}}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const DisabledInput = () => {
  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <TextInput
          label="API Key (Read Only)"
          value="sk_live_51Mz..."
          disabled
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const PasswordInput = () => {
  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <TextInput
          label="Password"
          type="password"
          placeholder="••••••••"
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkThemeInput = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ ...containerStyle, backgroundColor: 'var(--colors-surface-background)' }}>
        <h3 style={{ margin: '0 0 16px', color: 'var(--colors-text-primary)' }}>Dark Mode Form</h3>
        <TextInput
          label="Channel Name"
          placeholder="# general"
        />
        <TextInput
          label="Topic"
          placeholder="Discussing anything and everything"
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const ControlledInput = () => {
  const [value, setValue] = useState('');

  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <TextInput
          label="Controlled Input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type specifically here..."
        />
        <div style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>
          Current Value: {value}
        </div>
      </div>
    </CloudrabbitTheme>
  );
};