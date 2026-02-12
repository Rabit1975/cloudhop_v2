import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Tooltip } from './tooltip.js';

export const BasicUsage = () => {
  return (
    <CloudrabbitTheme>
      <div style={{
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '200px'
      }}>
        <Tooltip content="Add to favorites">
          <button style={{
            padding: 'var(--spacing-small) var(--spacing-medium)',
            backgroundColor: 'var(--colors-primary-default)',
            color: 'var(--colors-text-inverse)',
            border: 'none',
            borderRadius: 'var(--borders-radius-medium)',
            cursor: 'pointer',
            fontSize: 'var(--typography-sizes-body-default)',
            fontWeight: 'var(--typography-font-weight-medium)'
          }}>
            Hover Me
          </button>
        </Tooltip>
      </div>
    </CloudrabbitTheme>
  );
};

export const PositionVariations = () => {
  const boxStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: 'var(--colors-surface-secondary)',
    border: '1px solid var(--colors-border-default)',
    borderRadius: 'var(--borders-radius-medium)',
    cursor: 'pointer',
    textAlign: 'center',
    width: '100px',
    color: 'var(--colors-text-default)'
  };

  return (
    <CloudrabbitTheme>
      <div style={{
        padding: '100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '40px',
        justifyItems: 'center',
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '400px'
      }}>
        <Tooltip content="Top Tooltip" position="top">
          <div style={boxStyle}>Top</div>
        </Tooltip>
        
        <Tooltip content="Right Tooltip" position="right">
          <div style={boxStyle}>Right</div>
        </Tooltip>

        <Tooltip content="Bottom Tooltip" position="bottom">
          <div style={boxStyle}>Bottom</div>
        </Tooltip>

        <Tooltip content="Left Tooltip" position="left">
          <div style={boxStyle}>Left</div>
        </Tooltip>
      </div>
    </CloudrabbitTheme>
  );
};

export const HopHubUserAvatar = () => {
  return (
    <CloudrabbitTheme>
      <div style={{
        padding: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        backgroundColor: 'var(--colors-surface-background)',
        color: 'var(--colors-text-default)',
        minHeight: '200px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: 'var(--typography-sizes-caption-default)', color: 'var(--colors-text-secondary)' }}>
            Online Users
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Tooltip content="Alice (Online)" position="top">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FF5733',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                position: 'relative'
              }}>
                AL
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--colors-status-positive-default)',
                  border: '2px solid var(--colors-surface-background)'
                }} />
              </div>
            </Tooltip>

            <Tooltip content="Bob (Idle)" position="top">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#33C4FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                position: 'relative'
              }}>
                BO
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--colors-status-warning-default)',
                  border: '2px solid var(--colors-surface-background)'
                }} />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const HopMeetsControls = () => {
  const ControlButton = ({ icon, label }: { icon: string, label: string }) => (
    <Tooltip content={label} position="top">
      <button style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'var(--colors-surface-tertiary)',
        border: '1px solid var(--colors-border-default)',
        color: 'var(--colors-text-default)',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s'
      }}>
        {icon}
      </button>
    </Tooltip>
  );

  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{
        padding: '50px',
        backgroundColor: 'var(--colors-surface-background)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '16px 24px',
          backgroundColor: 'var(--colors-surface-secondary)',
          borderRadius: 'var(--borders-radius-full)',
          boxShadow: 'var(--effects-shadows-large)',
          alignItems: 'center'
        }}>
          <ControlButton icon="🎤" label="Mute Microphone" />
          <ControlButton icon="📷" label="Turn Off Camera" />
          <ControlButton icon="✋" label="Raise Hand" />
          
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--colors-border-subtle)', margin: '0 8px' }} />
          
          <Tooltip content="Leave Meeting" position="top">
            <button style={{
              padding: '0 24px',
              height: '48px',
              borderRadius: 'var(--borders-radius-full)',
              backgroundColor: 'var(--colors-status-negative-default)',
              color: 'var(--colors-text-inverse)',
              border: 'none',
              fontWeight: 'var(--typography-font-weight-medium)',
              cursor: 'pointer'
            }}>
              Leave
            </button>
          </Tooltip>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};