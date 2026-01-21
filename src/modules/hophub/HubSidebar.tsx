import React, { useState } from 'react'
import CreateGroupModal from './CreateGroupModal'
import CreateChannelModal from './CreateChannelModal'
import { useHubData } from './useHubData'

export default function HubSidebar({ activeChannel, onSelect }) {
  const { groups, channels, createGroup, createChannel } = useHubData()
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [showChannelModal, setShowChannelModal] = useState(null)
  const [expandedGroups, setExpandedGroups] = useState(new Set())

  function toggleGroup(groupId) {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  return (
    <div style={{
      width: '260px',
      background: '#16213e',
      borderRight: '1px solid #0f3460',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #0f3460',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#e94560', fontSize: '18px', fontWeight: 600 }}>
          HopHub
        </h2>
        <button
          onClick={() => setShowGroupModal(true)}
          style={{
            background: '#e94560',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          + Group
        </button>
      </div>

      {/* Groups and Channels */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {groups.map(group => (
          <div key={group.id} style={{ marginBottom: '12px' }}>
            {/* Group Header */}
            <div
              onClick={() => toggleGroup(group.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '6px',
                background: expandedGroups.has(group.id) ? '#0f3460' : 'transparent',
                color: '#fff',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              <span>
                {expandedGroups.has(group.id) ? '▼' : '▶'} {group.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowChannelModal(group.id)
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid #e94560',
                  color: '#e94560',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                +
              </button>
            </div>

            {/* Channels */}
            {expandedGroups.has(group.id) && (
              <div style={{ marginLeft: '20px', marginTop: '4px' }}>
                {channels
                  .filter(ch => ch.group_id === group.id)
                  .map(channel => (
                    <div
                      key={channel.id}
                      onClick={() => onSelect(channel)}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        background: activeChannel?.id === channel.id ? '#e94560' : 'transparent',
                        color: '#fff',
                        marginBottom: '4px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>
                        {channel.type === 'chat' ? '💬' : channel.type === 'meeting' ? '🎥' : '🌌'}
                      </span>
                      {channel.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      {showGroupModal && (
        <CreateGroupModal
          onClose={() => setShowGroupModal(false)}
          onCreate={createGroup}
        />
      )}
      {showChannelModal && (
        <CreateChannelModal
          groupId={showChannelModal}
          onClose={() => setShowChannelModal(null)}
          onCreate={createChannel}
        />
      )}
    </div>
  )
}
