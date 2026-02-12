import React from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { Table } from './table.js';

const serverData = [
  { id: '1', name: 'CloudHop HQ', region: 'NA-East', players: '1,240', status: 'Online', latency: '24ms' },
  { id: '2', name: 'Music Lounge', region: 'EU-West', players: '856', status: 'Online', latency: '45ms' },
  { id: '3', name: 'Gaming Arena', region: 'Asia-Pacific', players: '3,402', status: 'Busy', latency: '120ms' },
  { id: '4', name: 'Dev Sandbox', region: 'NA-West', players: '12', status: 'Maintenance', latency: '-' },
];

const musicData = [
  { id: '1', title: 'Neon Nebulas', artist: 'Stellar Drifter', album: 'Cosmic Rays', duration: '3:45' },
  { id: '2', title: 'Digital Dreams', artist: 'Cyber Soul', album: 'Neural Network', duration: '4:12' },
  { id: '3', title: 'Hop The Cloud', artist: 'The Connectors', album: 'Bandwidth', duration: '2:58' },
  { id: '4', title: 'Silent Space', artist: 'Void Walker', album: 'Null Pointer', duration: '5:30' },
];

export const ServerListTable = () => {
  const columns = [
    { 
      key: 'name', 
      title: 'Server Name', 
      render: (record) => (
        <span style={{ fontWeight: 'var(--typography-font-weight-bold)', color: 'var(--colors-text-primary)' }}>
          {record.name}
        </span>
      )
    },
    { key: 'region', title: 'Region' },
    { 
      key: 'status', 
      title: 'Status',
      render: (record) => {
        const color = record.status === 'Online' ? 'var(--colors-status-positive-default)' : 
                      record.status === 'Busy' ? 'var(--colors-status-warning-default)' : 
                      'var(--colors-status-negative-default)';
        return (
          <span style={{ 
            color, 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            fontWeight: 'var(--typography-font-weight-medium)' 
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} />
            {record.status}
          </span>
        );
      }
    },
    { key: 'players', title: 'Active Users', align: 'right' as const },
    { key: 'latency', title: 'Ping', align: 'right' as const, render: (r) => <span style={{ fontFamily: 'monospace' }}>{r.latency}</span> },
  ];

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', minHeight: '400px', backgroundColor: 'var(--colors-surface-background)' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)' }}>Active Servers</h3>
        <Table columns={columns} data={serverData} />
      </div>
    </CloudrabbitTheme>
  );
};

export const MusicPlaylistTable = () => {
  const columns = [
    {
      key: 'cover',
      title: '',
      width: 60,
      render: () => (
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: 'var(--borders-radius-medium)', 
          overflow: 'hidden',
          backgroundColor: 'var(--colors-surface-tertiary)'
        }}>
          <img 
            src="https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_data_structur_0_1770832604401.png" 
            alt="Album Art"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )
    },
    { 
      key: 'title', 
      title: 'Track',
      render: (r) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'var(--colors-text-primary)', fontWeight: 'var(--typography-font-weight-medium)' }}>{r.title}</span>
          <span style={{ fontSize: '12px', color: 'var(--colors-text-secondary)' }}>{r.artist}</span>
        </div>
      )
    },
    { key: 'album', title: 'Album' },
    { key: 'duration', title: 'Time', align: 'right' as const },
    { 
      key: 'actions', 
      title: '', 
      width: 50,
      align: 'center' as const,
      render: () => (
        <button style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          color: 'var(--colors-text-secondary)',
          fontSize: '18px',
          padding: '4px'
        }}>⋮</button>
      )
    }
  ];

  return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', minHeight: '400px', backgroundColor: 'var(--colors-surface-background)' }}>
         <h3 style={{ marginBottom: '16px', color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)' }}>Now Playing</h3>
        <Table columns={columns} data={musicData} />
      </div>
    </CloudrabbitTheme>
  );
};

export const EmptyAndLoadingStates = () => {
   const columns = [{ key: 'col1', title: 'Column 1' }, { key: 'col2', title: 'Column 2' }];

   return (
    <CloudrabbitTheme>
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', backgroundColor: 'var(--colors-surface-background)' }}>
        
        <div>
          <h4 style={{ marginBottom: '12px', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Loading State</h4>
          <Table columns={columns} data={serverData} loading={true} />
        </div>

        <div>
          <h4 style={{ marginBottom: '12px', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Empty State</h4>
          <Table 
            columns={columns} 
            data={[]} 
            emptyState={
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '24px' }}>📡</div>
                <div>No signals detected in this sector.</div>
              </div>
            } 
          />
        </div>

      </div>
    </CloudrabbitTheme>
   );
};