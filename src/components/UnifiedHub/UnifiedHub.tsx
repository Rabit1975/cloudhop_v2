import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Play, ArrowRight, Download, Share2, Star, Users, Zap, MessageSquare, Calendar, Video, Gamepad2, Rocket, Globe, Brain, Sparkles, Cpu, Wifi, Database, Cloud, Shield, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import QICIEngine from '../QICIEngine/QICIEngine';

interface HubItem {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  users?: number;
  category: 'game' | 'space' | 'meeting' | 'ai' | 'qici';
  icon: React.ReactNode;
  stats?: { label: string; value: string }[];
  gameId?: string;
  url?: string;
}

export default function UnifiedHub() {
  const [selectedItem, setSelectedItem] = useState<HubItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'game' | 'space' | 'meeting' | 'ai' | 'qici'>('all');

  // HTML5 Games (69+ games)
  const html5Games: HubItem[] = [
    {
      id: 'strikeforce',
      title: 'StrikeForce',
      description: 'Intense tactical combat in a dystopian future with stunning graphics',
      image: '/Robotninja .png',
      rating: 4.8,
      users: 12543,
      category: 'game',
      icon: <Gamepad2 className="w-5 h-5" />,
      stats: [
        { label: 'Active Players', value: '12.5K' },
        { label: 'Avg. Session', value: '25 min' },
        { label: 'Completion Rate', value: '87%' }
      ]
    },
    {
      id: 'tetris',
      title: 'Tetris',
      description: 'Classic block-stacking puzzle game with modern graphics',
      image: '/tetris.png',
      rating: 4.5,
      category: 'game',
      icon: <Gamepad2 className="w-5 h-5" />,
      stats: [
        { label: 'High Score', value: '15,000' },
        { label: 'Lines Cleared', value: '150' }
      ]
    },
    {
      id: 'snake',
      title: 'Snake',
      description: 'Classic snake game with smooth controls',
      image: '/snake.png',
      rating: 4.2,
      category: 'game',
      icon: <Gamepad2 className="w-5 h-5" />,
      stats: [
        { label: 'High Score', value: '8,500' },
        { label: 'Length', value: '45' }
      ]
    },
    {
      id: 'asteroids',
      title: 'Asteroids',
      description: 'Space shooter with asteroids and power-ups',
      image: '/asteroids.png',
      rating: 4.0,
      category: 'game',
      icon: <Gamepad2 className="w-5 h-5" />,
      stats: [
        { label: 'High Score', value: '25,000' },
        { label: 'Asteroids Destroyed', value: '1,247' }
      ]
    },
    {
      id: 'pong',
      title: 'Pong',
      description: 'Classic table tennis game',
      image: '/pong.png',
      rating: 4.3,
      users: 2,
      category: 'game',
      icon: <Gamepad2 className="w-5 h-5" />,
      stats: [
        { label: 'Rally Score', value: '21-18' },
        { label: 'Longest Rally', value: '87' }
      ]
    },
    // Add more games here to reach 69+
    ...Array.from({ length: 64 }, (_, i) => ({
      id: `game${i + 6}`,
      title: `Game ${i + 6}`,
      description: `HTML5 Game ${i + 6} with exciting gameplay`,
      image: `/game${i + 6}.png`,
      rating: 4.0 + (Math.random() * 0.9),
      category: 'game' as const,
      icon: <Gamepad2 className="w-5 h-5" />,
      stats: [
        { label: 'Players', value: `${Math.floor(Math.random() * 10000)}` },
        { label: 'Rating', value: `${(4.0 + Math.random() * 0.9).toFixed(1)}` }
      ]
    }))
  ];

  // QiciEngine Games
  const qiciGames: HubItem[] = [
    {
      id: 'qici-space-shooter',
      title: 'QICI Space Shooter',
      description: 'Advanced space shooter using QICI Engine',
      image: '/qici-space.png',
      rating: 4.7,
      category: 'qici',
      icon: <Rocket className="w-5 h-5" />,
      gameId: 'space-shooter',
      stats: [
        { label: 'Engine', value: 'QICI 1.1.6' },
        { label: 'FPS', value: '60' }
      ]
    },
    {
      id: 'qici-rpg',
      title: 'QICI RPG Adventure',
      description: 'Role-playing game with QICI Engine',
      image: '/qici-rpg.png',
      rating: 4.6,
      category: 'qici',
      icon: <Rocket className="w-5 h-5" />,
      gameId: 'rpg-adventure',
      stats: [
        { label: 'Engine', value: 'QICI 1.1.6' },
        { label: 'FPS', value: '60' }
      ]
    }
  ];

  // Spaces
  const spaces: HubItem[] = [
    {
      id: 'creative-space',
      title: 'Creative Space',
      description: 'Collaborative creative workspace for artists and designers',
      image: '/creative-space.png',
      rating: 4.9,
      users: 3421,
      category: 'space',
      icon: <Globe className="w-5 h-5" />,
      stats: [
        { label: 'Members', value: '3.4K' },
        { label: 'Projects', value: '127' },
        { label: 'Active Now', value: '89' }
      ]
    },
    {
      id: 'tech-hub',
      title: 'Tech Hub',
      description: 'Technical collaboration space for developers',
      image: '/tech-hub.png',
      rating: 4.8,
      users: 2156,
      category: 'space',
      icon: <Cpu className="w-5 h-5" />,
      stats: [
        { label: 'Developers', value: '2.1K' },
        { label: 'Repositories', value: '89' },
        { label: 'Active Now', value: '67' }
      ]
    },
    {
      id: 'learning-lab',
      title: 'Learning Lab',
      description: 'Educational space for knowledge sharing',
      image: '/learning-lab.png',
      rating: 4.7,
      users: 1876,
      category: 'space',
      icon: <Brain className="w-5 h-5" />,
      stats: [
        { label: 'Students', value: '1.8K' },
        { label: 'Courses', value: '45' },
        { label: 'Active Now', value: '123' }
      ]
    }
  ];

  // HopMeetings
  const meetings: HubItem[] = [
    {
      id: 'daily-standup',
      title: 'Daily Standup',
      description: 'Team daily synchronization meeting',
      image: '/standup.png',
      rating: 4.5,
      users: 12,
      category: 'meeting',
      icon: <Video className="w-5 h-5" />,
      url: '/meeting/daily-standup',
      stats: [
        { label: 'Participants', value: '12' },
        { label: 'Duration', value: '15 min' },
        { label: 'Next', value: '9:00 AM' }
      ]
    },
    {
      id: 'sprint-planning',
      title: 'Sprint Planning',
      description: 'Bi-weekly sprint planning session',
      image: '/sprint.png',
      rating: 4.6,
      users: 8,
      category: 'meeting',
      icon: <Calendar className="w-5 h-5" />,
      url: '/meeting/sprint-planning',
      stats: [
        { label: 'Team', value: '8' },
        { label: 'Duration', value: '2 hours' },
        { label: 'Next', value: 'Monday 10:00 AM' }
      ]
    },
    {
      id: 'retro-meeting',
      title: 'Sprint Retrospective',
      description: 'Team retrospective and improvement planning',
      image: '/retro.png',
      rating: 4.4,
      users: 10,
      category: 'meeting',
      icon: <MessageSquare className="w-5 h-5" />,
      url: '/meeting/retro',
      stats: [
        { label: 'Team', value: '10' },
        { label: 'Duration', value: '1 hour' },
        { label: 'Next', value: 'Friday 3:00 PM' }
      ]
    }
  ];

  // AI Tools
  const aiTools: HubItem[] = [
    {
      id: 'rabbit-ai',
      title: 'RabbitAI Assistant',
      description: 'Advanced AI assistant for productivity and automation',
      image: '/rabbit-ai.png',
      rating: 4.9,
      users: 8765,
      category: 'ai',
      icon: <Sparkles className="w-5 h-5" />,
      stats: [
        { label: 'Users', value: '8.7K' },
        { label: 'Queries', value: '45K' },
        { label: 'Success Rate', value: '94%' }
      ]
    },
    {
      id: 'code-assistant',
      title: 'Code Assistant AI',
      description: 'AI-powered code generation and debugging',
      image: '/code-ai.png',
      rating: 4.8,
      users: 5432,
      category: 'ai',
      icon: <Cpu className="w-5 h-5" />,
      stats: [
        { label: 'Developers', value: '5.4K' },
        { label: 'Code Generated', value: '1.2M lines' },
        { label: 'Bugs Fixed', value: '23K' }
      ]
    },
    {
      id: 'data-analyzer',
      title: 'Data Analyzer AI',
      description: 'Intelligent data analysis and visualization',
      image: '/data-ai.png',
      rating: 4.7,
      users: 3210,
      category: 'ai',
      icon: <Database className="w-5 h-5" />,
      stats: [
        { label: 'Analysts', value: '3.2K' },
        { label: 'Datasets', value: '890' },
        { label: 'Insights', value: '12K' }
      ]
    }
  ];

  // Combine all items
  const allItems: HubItem[] = [...html5Games, ...qiciGames, ...spaces, ...meetings, ...aiTools];

  // Filter items based on search and category
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All', icon: <Home className="w-4 h-4" /> },
    { id: 'game', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'qici', label: 'QICI Engine', icon: <Rocket className="w-4 h-4" /> },
    { id: 'space', label: 'Spaces', icon: <Globe className="w-4 h-4" /> },
    { id: 'meeting', label: 'Meetings', icon: <Video className="w-4 h-4" /> },
    { id: 'ai', label: 'AI Tools', icon: <Brain className="w-4 h-4" /> }
  ];

  const handleItemClick = (item: HubItem) => {
    setSelectedItem(item);
  };

  const renderSelectedItem = () => {
    if (!selectedItem) return null;

    if (selectedItem.category === 'qici' && selectedItem.gameId) {
      return (
        <div className="flex-1 flex flex-col">
          <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-4">
            <h2 className="text-xl font-bold text-white mb-2">{selectedItem.title}</h2>
            <p className="text-gray-300 text-sm">{selectedItem.description}</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <QICIEngine 
              gameId={selectedItem.gameId}
              width={800}
              height={600}
              onReady={() => console.log('QICI Engine ready')}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col">
        <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
              {selectedItem.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{selectedItem.title}</h2>
              <p className="text-gray-300">{selectedItem.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white font-medium">{selectedItem.rating}</span>
            </div>
          </div>
          
          {selectedItem.stats && (
            <div className="flex gap-4">
              {selectedItem.stats.map((stat, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-400">{stat.label}: </span>
                  <span className="text-white font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
              {selectedItem.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ready to Launch</h3>
            <p className="text-gray-300 mb-6">Click below to start using {selectedItem.title}</p>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all">
              Launch {selectedItem.title}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Unified Hub
          </h1>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search games, spaces, meetings, AI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-gray-400 outline-none w-64"
            />
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              )}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-black/20 backdrop-blur-sm border-r border-white/10 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-all',
                  selectedItem?.id === item.id
                    ? 'bg-cyan-500/20 border-cyan-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-300">{item.rating}</span>
                      {item.users && (
                        <>
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-300">{item.users}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {selectedItem ? (
          renderSelectedItem()
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <Home className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Welcome to Unified Hub</h3>
              <p className="text-gray-300 mb-4">Select an item from the sidebar to get started</p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span>{html5Games.length} Games</span>
                <span>•</span>
                <span>{qiciGames.length} QICI Games</span>
                <span>•</span>
                <span>{spaces.length} Spaces</span>
                <span>•</span>
                <span>{meetings.length} Meetings</span>
                <span>•</span>
                <span>{aiTools.length} AI Tools</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
