import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { UserCard } from './UserCard';
import { FriendRequestCard } from './FriendRequestCard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Users, UserPlus, Mail, Settings } from 'lucide-react';
import type { 
  UserProfile, 
  FriendRequest, 
  SocialConnection,
  UserPresenceStatus 
} from '../../types/people';

interface PeopleSectionProps {
  className?: string;
}

export const PeopleSection: React.FC<PeopleSectionProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'discover'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');

  // Mock data - in real app this would come from API
  const [friends] = useState<UserProfile[]>([
    {
      id: '1',
      userId: 'user-1',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      statusMessage: 'Working on CloudHop features 🚀',
      presenceStatus: 'online',
      socialConnections: [],
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      userId: 'user-2',
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob@example.com',
      statusMessage: 'In a meeting',
      presenceStatus: 'busy',
      socialConnections: [],
      createdAt: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      userId: 'user-3',
      firstName: 'Carol',
      lastName: 'Williams',
      email: 'carol@example.com',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
      statusMessage: 'Away from keyboard',
      presenceStatus: 'away',
      socialConnections: [],
      createdAt: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      userId: 'user-4',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david@example.com',
      statusMessage: '',
      presenceStatus: 'offline',
      socialConnections: [],
      createdAt: '2024-01-04T00:00:00Z'
    }
  ]);

  const [friendRequests] = useState<(FriendRequest & { sender: UserProfile })[]>([
    {
      id: 'req-1',
      fromUserId: 'user-5',
      toUserId: 'current-user',
      status: 'pending',
      createdAt: '2024-01-05T00:00:00Z',
      sender: {
        id: '5',
        userId: 'user-5',
        firstName: 'Eve',
        lastName: 'Davis',
        email: 'eve@example.com',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eve',
        statusMessage: 'Let\'s connect!',
        presenceStatus: 'online',
        socialConnections: [],
        createdAt: '2024-01-05T00:00:00Z'
      }
    },
    {
      id: 'req-2',
      fromUserId: 'user-6',
      toUserId: 'current-user',
      status: 'pending',
      createdAt: '2024-01-06T00:00:00Z',
      sender: {
        id: '6',
        userId: 'user-6',
        firstName: 'Frank',
        lastName: 'Miller',
        email: 'frank@example.com',
        statusMessage: 'New to CloudHop',
        presenceStatus: 'online',
        socialConnections: [],
        createdAt: '2024-01-06T00:00:00Z'
      }
    }
  ]);

  const [discoverUsers] = useState<UserProfile[]>([
    {
      id: '7',
      userId: 'user-7',
      firstName: 'Grace',
      lastName: 'Wilson',
      email: 'grace@example.com',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
      statusMessage: 'CloudHop enthusiast',
      presenceStatus: 'online',
      socialConnections: [],
      createdAt: '2024-01-07T00:00:00Z'
    },
    {
      id: '8',
      userId: 'user-8',
      firstName: 'Henry',
      lastName: 'Moore',
      email: 'henry@example.com',
      statusMessage: 'Developer',
      presenceStatus: 'away',
      socialConnections: [],
      createdAt: '2024-01-08T00:00:00Z'
    }
  ]);

  const filteredFriends = friends.filter(friend => 
    `${friend.firstName} ${friend.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscover = discoverUsers.filter(user => 
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFriend = () => {
    if (newFriendEmail.trim()) {
      console.log('Adding friend:', newFriendEmail);
      setNewFriendEmail('');
      setShowAddFriendModal(false);
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting request:', requestId);
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining request:', requestId);
  };

  const handleBlockRequest = (requestId: string) => {
    console.log('Blocking request:', requestId);
  };

  const handleSendFriendRequest = (userId: string) => {
    console.log('Sending friend request to:', userId);
  };

  return (
    <div className={cn('h-full flex flex-col', className)}>
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg">People</h2>
          <Button
            onClick={() => setShowAddFriendModal(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
            size="sm"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Add Friend
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('friends')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'friends' 
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            )}
          >
            <Users className="w-4 h-4 mr-1 inline" />
            Friends
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors relative',
              activeTab === 'requests' 
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            )}
          >
            <Mail className="w-4 h-4 mr-1 inline" />
            Requests
            {friendRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {friendRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'discover' 
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            )}
          >
            <Search className="w-4 h-4 mr-1 inline" />
            Discover
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'friends' && (
          <div className="space-y-3">
            {filteredFriends.length > 0 ? (
              filteredFriends.map(friend => (
                <UserCard
                  key={friend.id}
                  user={friend}
                  onClick={() => console.log('View profile:', friend.userId)}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No friends found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-3">
            {friendRequests.length > 0 ? (
              friendRequests.map(request => (
                <FriendRequestCard
                  key={request.id}
                  request={request}
                  sender={request.sender}
                  onAccept={() => handleAcceptRequest(request.id)}
                  onDecline={() => handleDeclineRequest(request.id)}
                  onBlock={() => handleBlockRequest(request.id)}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No friend requests</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="space-y-3">
            {filteredDiscover.length > 0 ? (
              filteredDiscover.map(user => (
                <div key={user.id}>
                  <UserCard
                    user={user}
                    onClick={() => console.log('View profile:', user.userId)}
                  />
                  <div className="mt-2 flex gap-2">
                    <Button
                      onClick={() => handleSendFriendRequest(user.userId)}
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                      size="sm"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add Friend
                    </Button>
                    <Button
                      onClick={() => console.log('View profile:', user.userId)}
                      className="bg-white/10 hover:bg-white/20 text-white"
                      size="sm"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Profile
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No users found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Friend Modal */}
      {showAddFriendModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-black/90 border border-white/20 rounded-2xl p-6 w-96">
            <h3 className="text-white font-semibold text-lg mb-4">Add Friend</h3>
            <Input
              type="email"
              placeholder="Enter email address..."
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowAddFriendModal(false);
                  setNewFriendEmail('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddFriend}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
