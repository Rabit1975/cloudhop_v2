import React, { useState } from 'react';
import { View } from '../types';

interface HopHubSimpleProps {
  onNavigate: (view: View) => void;
}

type HubTab = 'hopspaces' | 'music' | 'gamehub';
type SpaceSubTab = 'groups' | 'channels';

export const HopHubSimple: React.FC<HopHubSimpleProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<HubTab>('hopspaces');
  const [activeSpaceTab, setActiveSpaceTab] = useState<SpaceSubTab>('groups');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Mock data
  const mockSpaces = [
    {
      id: '1',
      name: 'Fluid Art',
      type: 'fluid_art',
      mood: 'calm',
      description: 'Collaborative fluid art space',
      tags: ['art', 'creative', 'visual'],
    },
    {
      id: '2',
      name: 'Ideas Space',
      type: 'ideas',
      mood: 'dreamy',
      description: 'General creative space',
      tags: ['creative', 'collaborative'],
    },
    {
      id: '3',
      name: 'Gaming Lounge',
      type: 'gaming',
      mood: 'energetic',
      description: 'Gaming and entertainment space',
      tags: ['gaming', 'fun', 'social'],
    },
  ];

  const mockChats = [
    { id: '1', name: 'HopHub General', type: 'channel', unread: 3, lastMessage: 'Sarah: Hey everyone!' },
    { id: '2', name: 'Dev Team', type: 'channel', unread: 0, lastMessage: 'Mike: Pushing new changes' },
    { id: '3', name: 'Gaming Squad', type: 'channel', unread: 1, lastMessage: 'Alex: Anyone up for a game?' },
    { id: '4', name: 'Sarah Chen', type: 'dm', unread: 2, lastMessage: 'Did you see the new update?' },
    { id: '5', name: 'Mike Johnson', type: 'dm', unread: 0, lastMessage: 'Thanks for the help!' },
  ];

  const mockGroups = [
    { id: '1', name: 'CloudHop Team', members: 12, description: 'Main development team' },
    { id: '2', name: 'Design Crew', members: 8, description: 'UI/UX and design discussions' },
    { id: '3', name: 'Gaming Community', members: 45, description: 'Gaming enthusiasts' },
  ];

  const handleTabChange = (tab: HubTab) => {
    setActiveTab(tab);
    setSelectedChatId(null);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#050819',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#000'
          }}>
            CH
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            HopHub
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            color: 'white'
          }}>
            🔔
          </button>
          <button style={{
            background: 'linear-gradient(135deg, #53C8FF 0%, #4AB8FF 100%)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#000'
          }}>
            👤 User
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        padding: '0 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        gap: '24px'
      }}>
        <button
          onClick={() => handleTabChange('hopspaces')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'hopspaces' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
            padding: '16px 0',
            fontSize: '16px',
            fontWeight: activeTab === 'hopspaces' ? '600' : '400',
            cursor: 'pointer',
            borderBottom: activeTab === 'hopspaces' ? '2px solid #53C8FF' : 'none',
            transition: 'all 0.2s'
          }}
        >
          🚀 HopSpaces
        </button>
        <button
          onClick={() => handleTabChange('music')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'music' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
            padding: '16px 0',
            fontSize: '16px',
            fontWeight: activeTab === 'music' ? '600' : '400',
            cursor: 'pointer',
            borderBottom: activeTab === 'music' ? '2px solid #53C8FF' : 'none',
            transition: 'all 0.2s'
          }}
        >
          🎵 Music
        </button>
        <button
          onClick={() => handleTabChange('gamehub')}
          style={{
            background: 'transparent',
            border: 'none',
            color: activeTab === 'gamehub' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
            padding: '16px 0',
            fontSize: '16px',
            fontWeight: activeTab === 'gamehub' ? '600' : '400',
            cursor: 'pointer',
            borderBottom: activeTab === 'gamehub' ? '2px solid #53C8FF' : 'none',
            transition: 'all 0.2s'
          }}
        >
          🎮 GameHub
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel */}
        <div style={{
          width: '300px',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Sub-tabs for HopSpaces */}
          {activeTab === 'hopspaces' && (
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '16px'
            }}>
              <button
                onClick={() => setActiveSpaceTab('groups')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeSpaceTab === 'groups' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: activeSpaceTab === 'groups' ? '600' : '400',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
              >
                👥 Groups
              </button>
              <button
                onClick={() => setActiveSpaceTab('channels')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeSpaceTab === 'channels' ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: activeSpaceTab === 'channels' ? '600' : '400',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.2s'
                }}
              >
                📢 Channels
              </button>
            </div>
          )}

          {/* Chat/Group List */}
          <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
            {activeTab === 'hopspaces' && activeSpaceTab === 'channels' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat.id)}
                    style={{
                      background: selectedChatId === chat.id ? 'rgba(83, 200, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: selectedChatId === chat.id ? '1px solid rgba(83, 200, 255, 0.4)' : '1px solid transparent',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>
                        {chat.type === 'dm' ? '👤 ' : '📢 '}{chat.name}
                      </span>
                      {chat.unread > 0 && (
                        <div style={{
                          background: '#53C8FF',
                          color: '#000',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          {chat.unread}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                      {chat.lastMessage}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hopspaces' && activeSpaceTab === 'groups' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockGroups.map((group) => (
                  <div
                    key={group.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                      👥 {group.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      {group.members} members • {group.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'music' && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255, 255, 255, 0.6)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎵</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>
                  Music Player
                </h3>
                <p>Music streaming features coming soon!</p>
              </div>
            )}

            {activeTab === 'gamehub' && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255, 255, 255, 0.6)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>
                  GameHub Engine
                </h3>
                <p>Gaming features coming soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* Center Panel - Chat Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div style={{
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    {selectedChat.type === 'dm' ? '👤 ' : '📢 '}{selectedChat.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {selectedChat.type === 'dm' ? 'Direct Message' : 'Channel'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: 'white'
                  }}>
                    🔍
                  </button>
                  <button style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: 'white'
                  }}>
                    ⚙️
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
                <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', marginTop: '100px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>
                    Chat Interface
                  </h3>
                  <p>Real-time messaging coming soon!</p>
                </div>
              </div>

              {/* Message Input */}
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: '12px'
              }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button style={{
                  background: '#53C8FF',
                  color: '#000',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>💬</div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>
                  Welcome to HopHub
                </h3>
                <p style={{ fontSize: '16px', marginBottom: '24px' }}>
                  Select a channel or direct message to start chatting
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button
                    onClick={() => onNavigate(View.DASHBOARD)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div style={{
          width: '300px',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px'
        }}>
          {selectedChat ? (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#53C8FF' }}>
                Chat Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                    {selectedChat.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {selectedChat.type === 'dm' ? 'Direct Message' : 'Channel'}
                  </div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                    Members
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {selectedChat.type === 'dm' ? '2 participants' : '245 members'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>ℹ️</div>
              <p style={{ fontSize: '14px' }}>
                Select a chat to see details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
