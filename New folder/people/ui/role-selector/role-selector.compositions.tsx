import React, { useState } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';
import { RoleSelector } from './role-selector.js';

export const MultiSelectRoles = () => {
  const [roles, setRoles] = useState<UserRole[]>([UserRole.User]);

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '48px', maxWidth: '400px', minHeight: '350px' }}>
        <h2 style={{ fontSize: 'var(--typography-sizes-heading-h5)', marginTop: 0 }}>Role Assignment</h2>
        <p style={{ color: 'var(--colors-text-secondary)', marginBottom: '24px' }}>
          Assign one or more roles to the user.
        </p>
        <RoleSelector
          label="Assign User Roles"
          selectedRoles={roles}
          onChange={setRoles}
        />
        <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--colors-text-secondary)' }}>
          Selected: {roles.length > 0 ? roles.join(', ') : 'None'}
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const SingleSelectRole = () => {
  const [roles, setRoles] = useState<UserRole[]>([UserRole.Admin]);

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '48px', maxWidth: '400px', minHeight: '350px' }}>
        <h2 style={{ fontSize: 'var(--typography-sizes-heading-h5)', marginTop: 0 }}>Primary Role</h2>
        <RoleSelector
          singleSelection
          label="Select Primary Role"
          selectedRoles={roles}
          onChange={setRoles}
        />
        <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--colors-text-secondary)' }}>
          Current Role: {roles[0] || 'None'}
        </div>
      </div>
    </CloudrabbitTheme>
  );
};

export const EmptyState = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '48px', maxWidth: '400px', minHeight: '350px' }}>
        <RoleSelector
          label="Filter by Role"
          placeholder="Choose roles to filter..."
          selectedRoles={roles}
          onChange={setRoles}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const DisabledState = () => {
  return (
    <CloudrabbitTheme>
      <div style={{ padding: '48px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <RoleSelector
          disabled
          label="Disabled Multi-Select"
          selectedRoles={[UserRole.User, UserRole.Guest]}
        />
        <RoleSelector
          disabled
          singleSelection
          label="Disabled Single-Select"
          selectedRoles={[UserRole.Admin]}
        />
      </div>
    </CloudrabbitTheme>
  );
};

export const DarkModeUsage = () => {
  const [roles, setRoles] = useState<UserRole[]>([UserRole.Moderator, UserRole.User]);

  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{ 
        padding: '64px', 
        minHeight: '400px', 
        backgroundColor: 'var(--colors-surface-background)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '360px',
          padding: '24px',
          backgroundColor: 'var(--colors-surface-primary)',
          borderRadius: 'var(--borders-radius-large)',
          boxShadow: 'var(--effects-shadows-medium)'
        }}>
          <h3 style={{ marginTop: 0, color: 'var(--colors-text-primary)' }}>Manage Access</h3>
          <p style={{ color: 'var(--colors-text-secondary)', marginBottom: '24px' }}>
            Select roles to grant permissions.
          </p>
          <RoleSelector
            selectedRoles={roles}
            onChange={setRoles}
          />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};