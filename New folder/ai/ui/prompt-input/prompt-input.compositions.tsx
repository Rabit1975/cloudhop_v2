import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { PromptInput } from './prompt-input.js';

const containerStyle = {
  padding: '40px',
  maxWidth: '800px',
  backgroundColor: 'var(--colors-surface-background)',
  minHeight: '400px',
};

export const BasicUsage = () => {
  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <h3 style={{ color: 'var(--colors-text-primary)', marginTop: 0 }}>Create with AI</h3>
        <PromptInput onSubmit={(val) => console.log('Submitted:', val)} />
      </div>
    </CloudrabbitTheme>
  );
};

export const LoadingState = () => {
  return (
    <CloudrabbitTheme>
      <div style={containerStyle}>
        <h3 style={{ color: 'var(--colors-text-primary)', marginTop: 0 }}>Generating Content...</h3>
        <PromptInput 
          value="A futuristic city in the clouds with neon lights and flying cars." 
          isLoading 
          onChange={() => {}} 
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
        <h3 style={{ color: 'var(--colors-text-primary)', marginTop: 0 }}>Controlled Input</h3>
        <PromptInput 
          value={value} 
          onChange={setValue}
          placeholder="Type here..."
        />
        <div style={{ marginTop: '16px', color: 'var(--colors-text-secondary)' }}>
          Live Preview: {value}
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkThemeNebula = () => {
  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '40px', 
        maxWidth: '800px',
        backgroundImage: 'var(--effects-gradients-nebula)',
        backgroundSize: 'cover',
        borderRadius: 'var(--borders-radius-large)',
        minHeight: '400px'
      }}>
        <h2 style={{ 
          color: 'var(--colors-text-primary)', 
          marginTop: 0,
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          Magic Canvas
        </h2>
        <p style={{ color: 'var(--colors-text-secondary)', marginBottom: '24px' }}>
          Describe your imagination and let the CloudHop AI engine bring it to life in the Spaces module.
        </p>
        <PromptInput 
          placeholder="e.g., A cyberpunk street food vendor in Tokyo, 4k, octane render..."
          maxLength={500}
          onSubmit={(val) => alert(`Generating: ${val}`)}
        />
      </div>
    </CloudrabbitTheme>
  );
};