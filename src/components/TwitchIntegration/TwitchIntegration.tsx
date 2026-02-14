import React, { useState, useEffect } from 'react';
import { Search, Users, Video, Settings, ExternalLink, Bell, MessageSquare, Heart, Eye, Twitch, Loader2, Info, Share2, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tooltip Component
const Tooltip: React.FC<{ children: React.ReactNode; text: string; position?: 'top' | 'bottom' | 'left' | 'right' }> = ({ 
  children, 
  text, 
  position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className={cn(
          'absolute z-50 px-2 py-1 text-xs text-white bg-black/90 rounded-lg whitespace-nowrap',
          positionClasses[position]
        )}>
          {text}
          <div className={cn(
            'absolute w-2 h-2 bg-black/90 transform rotate-45',
            position === 'top' && 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1',
            position === 'bottom' && 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1',
            position === 'left' && 'right-0 top-1/2 transform -translate-y-1/2 translate-x-1',
            position === 'right' && 'left-0 top-1/2 transform -translate-y-1/2 -translate-x-1'
          )} />
        </div>
      )}
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('animate-spin', sizeClasses[size])}>
      <Loader2 className="w-full h-full text-purple-400" />
    </div>
  );
};

interface Stream {
  id: string;
  title: string;
  streamer: string;
  game: string;
  viewers: number;
  category: 'gaming' | 'music' | 'creative' | 'irl';
  thumbnail: string;
  isLive: boolean;
  startTime: Date;
  tags: string[];
}

interface TwitchChannel {
  id: string;
  name: string;
  followers: number;
  subscribers: number;
  isLive: boolean;
  avatar: string;
  banner: string;
  description: string;
}

export default function TwitchIntegration() {
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<TwitchChannel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'streams' | 'channels' | 'following'>('streams');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Mock Twitch data
  const streams: Stream[] = [
    {
      id: 'stream1',
      title: 'Epic Gaming Session',
      streamer: 'ProGamer123',
      game: 'Valorant',
      viewers: 15420,
      category: 'gaming',
      thumbnail: '/twitch/stream1-thumb.jpg',
      isLive: true,
      startTime: new Date(),
      tags: ['valorant', 'competitive', 'fps']
    },
    {
      id: 'stream2',
      title: 'Chill Music Production',
      streamer: 'MusicBeats',
      game: 'FL Studio',
      viewers: 8934,
      category: 'music',
      thumbnail: '/twitch/stream2-thumb.jpg',
      isLive: true,
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['music', 'production', 'fl-studio']
    },
    {
      id: 'stream3',
      title: 'Creative Art Stream',
      streamer: 'ArtistLife',
      game: 'Photoshop',
      viewers: 3210,
      category: 'creative',
      thumbnail: '/twitch/stream3-thumb.jpg',
      isLive: false,
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tags: ['art', 'creative', 'digital']
    },
    {
      id: 'stream4',
      title: 'IRL Adventure',
      streamer: 'ExplorerJoe',
      game: 'Real Life',
      viewers: 567,
      category: 'irl',
      thumbnail: '/twitch/stream4-thumb.jpg',
      isLive: true,
      startTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
      tags: ['irl', 'adventure', 'travel']
    }
  ];

  const channels: TwitchChannel[] = [
    {
      id: 'channel1',
      name: 'CloudHop Official',
      followers: 45678,
      subscribers: 1234,
      isLive: false,
      avatar: '/twitch/channel1-avatar.jpg',
      banner: '/twitch/channel1-banner.jpg',
      description: 'Official CloudHop gaming and streaming channel'
    },
    {
      id: 'channel2',
      name: 'HopHub Community',
      followers: 8934,
      subscribers: 567,
      isLive: true,
      avatar: '/twitch/channel2-avatar.jpg',
      banner: '/twitch/channel2-banner.jpg',
      description: 'Community channel for HopHub users and creators'
    },
    {
      id: 'channel3',
      name: 'Dev Talk',
      followers: 12345,
      subscribers: 892,
      isLive: false,
      avatar: '/twitch/channel3-avatar.jpg',
      banner: '/twitch/channel3-banner.jpg',
      description: 'Developer talks, coding sessions, and tech discussions'
    }
  ];

  const filteredStreams = streams.filter(stream => 
    stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stream.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stream.streamer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    channel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStreamClick = (stream: Stream) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedStream(stream);
      setSelectedChannel(null);
      setIsLoading(false);
    }, 500);
  };

  const handleChannelClick = (channel: TwitchChannel) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedChannel(channel);
      setSelectedStream(null);
      setIsLoading(false);
    }, 500);
  };

  const formatViewers = (viewers: number) => {
    if (viewers >= 1000000) {
      return `${(viewers / 1000000).toFixed(1)}M`;
    } else if (viewers >= 1000) {
      return `${(viewers / 1000).toFixed(1)}K`;
    }
    return viewers.toString();
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-900 via-purple-800/50 to-purple-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-purple-600 rounded-lg px-3 py-2">
              <Twitch className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">Twitch Integration</h1>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search streams, channels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 outline-none w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          {[
            { id: 'streams', label: 'Live Streams', icon: <Video className="w-4 h-4" /> },
            { id: 'channels', label: 'Channels', icon: <Users className="w-4 h-4" /> },
            { id: 'following', label: 'Following', icon: <Heart className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-black/20 backdrop-blur-sm border-r border-white/10 overflow-y-auto">
          <div className="p-4 space-y-4">
            {activeTab === 'streams' && (
              <div>
                <h3 className="text-white font-medium mb-3">Live Streams</h3>
                <div className="space-y-2">
                  {filteredStreams.map(stream => (
                    <div
                      key={stream.id}
                      onClick={() => handleStreamClick(stream)}
                      className={cn(
                        'p-3 rounded-lg border cursor-pointer transition-all',
                        selectedStream?.id === stream.id
                          ? 'bg-purple-600/20 border-purple-500/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <img 
                            src={stream.thumbnail} 
                            alt={stream.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          {stream.isLive && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                              LIVE
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Tooltip text={stream.title} position="top">
                              <h4 className="text-white font-medium truncate">{stream.title}</h4>
                            </Tooltip>
                            {stream.isLive && (
                              <Tooltip text="Currently streaming live" position="top">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                  <span className="text-xs text-red-400 font-medium">LIVE</span>
                                </div>
                              </Tooltip>
                            )}
                          </div>
                          <Tooltip text={`Follow ${stream.streamer}`} position="top">
                            <p className="text-gray-300 text-sm hover:text-purple-400 transition-colors cursor-pointer">
                              {stream.streamer}
                            </p>
                          </Tooltip>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <Tooltip text={`${stream.viewers.toLocaleString()} viewers`} position="top">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{formatViewers(stream.viewers)}</span>
                              </div>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Playing:</span>
                            <Tooltip text={`View more ${stream.game} streams`} position="top">
                              <span className="text-white hover:text-purple-400 transition-colors cursor-pointer">
                                {stream.game}
                              </span>
                            </Tooltip>
                          </div>
                          {stream.tags && (
                            <div className="flex gap-1 flex-wrap">
                              {stream.tags.slice(0, 2).map((tag, index) => (
                                <Tooltip text={`#${tag} tag`} position="top" key={index}>
                                  <span className="px-1.5 py-0.5 bg-purple-600/20 text-purple-300 text-xs rounded-full hover:bg-purple-600/30 transition-colors cursor-pointer">
                                    #{tag}
                                  </span>
                                </Tooltip>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Tooltip text="Watch on Twitch" position="left">
                            <a
                              href={`https://twitch.tv/${stream.streamer}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Tooltip>
                          <Tooltip text="Share stream" position="left">
                            <button
                              className="p-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Share2 className="w-3 h-3" />
                            </button>
                          </Tooltip>
                          <Tooltip text={isMuted ? "Unmute notifications" : "Mute notifications"} position="left">
                            <button
                              className="p-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted(!isMuted);
                              }}
                            >
                              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'channels' && (
              <div>
                <h3 className="text-white font-medium mb-3">Popular Channels</h3>
                <div className="space-y-2">
                  {filteredChannels.map(channel => (
                    <div
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel)}
                      className={cn(
                        'p-3 rounded-lg border cursor-pointer transition-all',
                        selectedChannel?.id === channel.id
                          ? 'bg-purple-600/20 border-purple-500/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <img 
                          src={channel.avatar} 
                          alt={channel.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-medium">{channel.name}</h4>
                            {channel.isLive && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-xs text-red-400 font-medium">LIVE</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <Users className="w-3 h-3" />
                            <span>{channel.followers.toLocaleString()} followers</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Subscribers:</span>
                            <span className="text-white">{channel.subscribers.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'following' && (
              <div>
                <h3 className="text-white font-medium mb-3">Following</h3>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-purple-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Your Following List</h3>
                  <p className="text-gray-300 text-sm">Channels and streams you follow will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          {isLoading ? (
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="text-gray-300 mt-4">Loading stream...</p>
            </div>
          ) : !selectedStream && !selectedChannel ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Twitch className="w-12 h-12 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Welcome to Twitch Integration</h3>
              <p className="text-gray-300 mb-4">Select a stream or channel to get started</p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span>{streams.length} streams</span>
                <span>•</span>
                <span>{channels.length} channels</span>
              </div>
            </div>
          ) : selectedStream ? (
            <div className="w-full h-full flex flex-col">
              <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={selectedStream.thumbnail} 
                      alt={selectedStream.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    {selectedStream.isLive && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-white">{selectedStream.title}</h2>
                      <Tooltip text="Stream information" position="top">
                        <Info className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                      </Tooltip>
                    </div>
                    <Tooltip text={`Follow ${selectedStream.streamer}`} position="top">
                      <p className="text-gray-300 mb-4 hover:text-purple-400 transition-colors cursor-pointer">
                        {selectedStream.streamer}
                      </p>
                    </Tooltip>
                    <div className="flex items-center gap-4 mb-4">
                      <Tooltip text={`${selectedStream.viewers.toLocaleString()} viewers`} position="top">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span>{formatViewers(selectedStream.viewers)} viewers</span>
                        </div>
                      </Tooltip>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Playing:</span>
                        <Tooltip text={`View more ${selectedStream.game} streams`} position="top">
                          <span className="text-white hover:text-purple-400 transition-colors cursor-pointer">
                            {selectedStream.game}
                          </span>
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Started:</span>
                        <span className="text-white">{selectedStream.startTime.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {selectedStream.tags && (
                      <div className="flex gap-2 mb-4">
                        {selectedStream.tags.map((tag, index) => (
                          <Tooltip text={`#${tag} tag`} position="top" key={index}>
                            <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full hover:bg-purple-600/30 transition-colors cursor-pointer">
                              #{tag}
                            </span>
                          </Tooltip>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex gap-4">
                  <a
                    href={`https://twitch.tv/${selectedStream.streamer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Watch on Twitch
                  </a>
                  <Tooltip text="Share this stream" position="top">
                    <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : selectedChannel ? (
            <div className="w-full h-full flex flex-col">
              <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={selectedChannel.banner} 
                      alt={selectedChannel.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2">
                      <img 
                        src={selectedChannel.avatar} 
                        alt={selectedChannel.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white"
                      />
                    </div>
                  </div>
                  <div className="flex-1 ml-20">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-white">{selectedChannel.name}</h2>
                      {selectedChannel.isLive && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-red-400 font-medium">LIVE</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4">{selectedChannel.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <Tooltip text={`${selectedChannel.followers.toLocaleString()} followers`} position="top">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{formatFollowers(selectedChannel.followers)} followers</span>
                        </div>
                      </Tooltip>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Subscribers:</span>
                        <span className="text-white">{selectedChannel.subscribers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex gap-4">
                  <a
                    href={`https://twitch.tv/${selectedChannel.name.toLowerCase().replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Channel
                  </a>
                  <Tooltip text="Share this channel" position="top">
                    <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
