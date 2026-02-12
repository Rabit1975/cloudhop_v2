import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Dropdown } from './dropdown.js';

const MenuItem = ({ label, icon, destructive }: { label: string; icon?: string; destructive?: boolean }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-medium)',
        padding: 'var(--spacing-small) var(--spacing-medium)',
        cursor: 'var(--interactions-cursor-pointer)',
        borderRadius: 'var(--borders-radius-small)',
        color: destructive ? 'var(--colors-status-negative-default)' : 'var(--colors-text-default)',
        fontSize: 'var(--typography-sizes-body-small)',
        transition: 'background-color var(--interactions-transitions-duration-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--colors-surface-tertiary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </div>
  );
};

const MenuDivider = () => (
  <div style={{ height: '1px', backgroundColor: 'var(--colors-border-subtle)', margin: 'var(--spacing-xs) 0' }} />
);

export const UserProfileMenu = () => {
  const userImage = "https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_data_flow_and_0_1770832820622.png";
  
  const UserTrigger = () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 'var(--spacing-small)', 
      padding: 'var(--spacing-small)',
      backgroundColor: 'var(--colors-surface-primary)',
      borderRadius: 'var(--borders-radius-full)',
      border: '1px solid var(--colors-border-subtle)'
    }}>
      <img 
        src={userImage} 
        alt="User" 
        style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          objectFit: 'cover' 
        }} 
      />
      <span style={{ 
        fontWeight: 'var(--typography-font-weight-medium)',
        paddingRight: 'var(--spacing-small)',
        fontSize: 'var(--typography-sizes-body-small)'
      }}>
        Nebula Walker
      </span>
      <span style={{ fontSize: '10px', paddingRight: 'var(--spacing-xs)' }}>▼</span>
    </div>
  );

  return (
    <CloudrabbitTheme>
      <div style={{ 
        width: '100%', 
        height: '400px', 
        display: 'flex', 
        justifyContent: 'center', 
        paddingTop: '50px',
        backgroundColor: 'var(--colors-surface-background)' 
      }}>
        <Dropdown placeholder={<UserTrigger />} openPosition="right">
          <div style={{ padding: 'var(--spacing-small) var(--spacing-medium)' }}>
            <div style={{ fontWeight: 'bold', fontSize: 'var(--typography-sizes-body-small)' }}>Nebula Walker</div>
            <div style={{ fontSize: 'var(--typography-sizes-caption-default)', color: 'var(--colors-text-secondary)' }}>nebula@cloudhop.com</div>
          </div>
          <MenuDivider />
          <MenuItem label="View Profile" icon="👤" />
          <MenuItem label="Account Settings" icon="⚙️" />
          <MenuItem label="HopHub Status" icon="🟢" />
          <MenuDivider />
          <MenuItem label="Sign Out" icon="🚪" destructive />
        </Dropdown>
      </div>
    </CloudrabbitTheme>
  );
};

export const ChannelSettings = () => {
  const SettingsTrigger = () => (
    <button style={{
      backgroundColor: 'var(--colors-primary-default)',
      color: 'var(--colors-primary-contrast)',
      border: 'none',
      padding: 'var(--spacing-small) var(--spacing-large)',
      borderRadius: 'var(--borders-radius-medium)',
      fontWeight: 'var(--typography-font-weight-bold)',
      cursor: 'var(--interactions-cursor-pointer)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-small)',
      fontSize: 'var(--typography-sizes-body-small)'
    }}>
      <span># general</span>
      <span>⚙️</span>
    </button>
  );

  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        width: '100%', 
        height: '400px', 
        display: 'flex', 
        alignItems: 'flex-start', 
        padding: '50px',
        backgroundColor: 'var(--colors-surface-background)' 
      }}>
        <Dropdown placeholder={<SettingsTrigger />} openPosition="left">
          <div style={{ 
            padding: 'var(--spacing-xs) var(--spacing-medium)', 
            fontSize: '10px', 
            textTransform: 'uppercase', 
            color: 'var(--colors-text-secondary)',
            fontWeight: 'bold'
          }}>
            Channel Settings
          </div>
          <MenuItem label="Edit Channel" icon="✏️" />
          <MenuItem label="Notification Settings" icon="🔔" />
          <MenuItem label="Pinned Messages" icon="📌" />
          <MenuDivider />
          <MenuItem label="Delete Channel" icon="🗑️" destructive />
        </Dropdown>
      </div>
    </CloudrabbitTheme>
  );
};

export const MusicPlayerContext = () => {
  const OptionsTrigger = () => (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--colors-surface-secondary)',
      color: 'var(--colors-text-default)',
      cursor: 'var(--interactions-cursor-pointer)',
      fontSize: '20px',
      transition: 'background-color 0.2s',
      boxShadow: 'var(--effects-shadows-small)'
    }}>
      •••
    </div>
  );

  return (
    <CloudrabbitTheme>
      <div style={{ 
        width: '100%', 
        height: '350px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: '20px',
        backgroundColor: 'var(--colors-surface-background)',
        backgroundImage: 'var(--effects-gradients-nebula)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px', 
          padding: '24px', 
          backgroundColor: 'var(--colors-surface-primary)',
          borderRadius: 'var(--borders-radius-large)',
          boxShadow: 'var(--effects-shadows-large)'
        }}>
          <img 
            src="https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_data_flow_and_0_1770832820622.png"
            style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
            alt="Album Art"
          />
          <div style={{ marginRight: '32px' }}>
            <div style={{ fontWeight: 'bold', fontSize: 'var(--typography-sizes-body-large)' }}>Stellar Drifting</div>
            <div style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>Cosmic Beats</div>
          </div>
          
          <Dropdown placeholder={<OptionsTrigger />} openPosition="center">
            <MenuItem label="Add to Queue" icon="🎵" />
            <MenuItem label="Save to Library" icon="❤️" />
            <MenuItem label="View Artist" icon="👨‍🎤" />
            <MenuItem label="Share" icon="🔗" />
          </Dropdown>
        </div>
      </div>
    </CloudrabbitTheme>
  );
};