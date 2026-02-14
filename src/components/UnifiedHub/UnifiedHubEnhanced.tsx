import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Users, 
  MessageSquare, 
  Music, 
  Globe,
  Zap,
  TrendingUp,
  Calendar,
  Star,
  Play,
  Settings,
  Bell
} from 'lucide-react';

// Mock data for unified hub
const recentActivities = [
  {
    id: '1',
    type: 'game',
    title: 'Chess Tournament',
    description: 'Weekly chess championship starting soon',
    time: '5 min ago',
    icon: <Gamepad2 className="w-5 h-5" />,
    color: 'text-cyan-400'
  },
  {
    id: '2',
    type: 'space',
    title: 'Creative Studio',
    description: 'New members joined the collaborative art space',
    time: '15 min ago',
    icon: <Globe className="w-5 h-5" />,
    color: 'text-purple-400'
  },
  {
    id: '3',
    type: 'message',
    title: 'General Chat',
    description: 'New messages in #general channel',
    time: '30 min ago',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'text-green-400'
  },
  {
    id: '4',
    type: 'music',
    title: 'Music Sharing',
    description: 'New tracks added to the playlist',
    time: '1 hour ago',
    icon: <Music className="w-5 h-5" />,
    color: 'text-pink-400'
  }
];

const quickActions = [
  {
    id: '1',
    title: 'Quick Game',
    description: 'Jump into a random game',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'from-cyan-500 to-cyan-400',
    action: 'game'
  },
  {
    id: '2',
    title: 'Join Space',
    description: 'Enter a collaborative space',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-400',
    action: 'space'
  },
  {
    id: '3',
    title: 'Start Chat',
    description: 'Open messaging',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'from-green-500 to-green-400',
    action: 'chat'
  },
  {
    id: '4',
    title: 'Play Music',
    description: 'Launch music player',
    icon: <Music className="w-6 h-6" />,
    color: 'from-pink-500 to-pink-400',
    action: 'music'
  }
];

const stats = [
  {
    id: '1',
    title: 'Active Users',
    value: '1,247',
    change: '+12%',
    icon: <Users className="w-5 h-5" />,
    color: 'text-cyan-400'
  },
  {
    id: '2',
    title: 'Games Played',
    value: '3,892',
    change: '+8%',
    icon: <Gamepad2 className="w-5 h-5" />,
    color: 'text-purple-400'
  },
  {
    id: '3',
    title: 'Messages',
    value: '15.2K',
    change: '+24%',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'text-green-400'
  },
  {
    id: '4',
    title: 'Spaces Active',
    value: '89',
    change: '+5%',
    icon: <Globe className="w-5 h-5" />,
    color: 'text-pink-400'
  }
];

export function UnifiedHubEnhanced() {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'quick-actions'>('overview');

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // Navigate to appropriate section
    switch (action) {
      case 'game':
        window.location.href = '/gamehub';
        break;
      case 'space':
        window.location.href = '/spaces';
        break;
      case 'chat':
        window.location.href = '/hophub';
        break;
      case 'music':
        window.location.href = '/music';
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Unified Hub
          </h1>
          <p className="text-white/60 text-lg">
            Your complete CloudHop experience in one place
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mb-6">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="overview" className="text-white/80 data-[state=active]:text-cyan-400">
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-white/80 data-[state=active]:text-cyan-400">
              Activity
            </TabsTrigger>
            <TabsTrigger value="quick-actions" className="text-white/80 data-[state=active]:text-cyan-400">
              Quick Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(stat => (
                <Card key={stat.id} className="bg-black/20 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={stat.color}>{stat.icon}</div>
                      <Badge variant="outline" className="text-green-400 border-green-400/50">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map(action => (
                <Card 
                  key={action.id}
                  className="group bg-black/20 backdrop-blur-sm border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                    <p className="text-white/60 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity Preview */}
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.slice(0, 3).map(activity => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className={activity.color}>{activity.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{activity.title}</h4>
                        <p className="text-white/60 text-sm">{activity.description}</p>
                      </div>
                      <span className="text-white/40 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  All Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className={activity.color}>{activity.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{activity.title}</h4>
                        <p className="text-white/60 text-sm">{activity.description}</p>
                      </div>
                      <span className="text-white/40 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quick-actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Navigation</CardTitle>
                  <CardDescription className="text-white/60">
                    Jump to any section of CloudHop
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => window.location.href = '/gamehub'}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Game Hub
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/spaces'}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Spaces
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/hophub'}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    HopHub
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/music'}
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Music
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Settings</CardTitle>
                  <CardDescription className="text-white/60">
                    Manage your CloudHop experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Profile Settings
                  </Button>
                  <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white">
                    <Star className="w-4 h-4 mr-2" />
                    Favorites
                  </Button>
                  <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Friends
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
