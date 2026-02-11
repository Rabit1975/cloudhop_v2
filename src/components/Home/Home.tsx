import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  Music, 
  Gamepad2, 
  Globe,
  TrendingUp,
  Activity,
  Clock,
  Star
} from 'lucide-react';

const Home: React.FC = () => {
  const stats = [
    { label: 'System Health', value: '99.9%', icon: Activity, trend: 'Stable' }
  ];

  const quickActions = [
    { 
      title: 'Start Chat', 
      description: 'Join the conversation',
      icon: MessageSquare,
      color: 'from-cyan-400 to-blue-500',
      action: 'hophub' as const
    },
    { 
      title: 'Schedule Meeting', 
      description: 'Create a video meeting',
      icon: Calendar,
      color: 'from-purple-400 to-pink-500',
      action: 'meetings' as const
    }
  ];

  const recentActivity: any[] = [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-4 lg:mb-8">
        <h1 className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-2">Welcome to CloudHop</h1>
        <p className="text-sm lg:text-lg text-gray-300">Your digital workspace for communication and collaboration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-panel">
            <CardContent className="p-3 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-300">{stat.label}</p>
                  <p className="text-lg lg:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-cyan-400 mt-1">{stat.trend}</p>
                </div>
                <div className="p-2 lg:p-3 bg-cyan-400/10 rounded-lg">
                  <stat.icon className="w-4 h-4 lg:w-6 lg:h-6 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-4 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
          {quickActions.map((action, index) => (
            <Card key={index} className="glass-panel hover:scale-105 transition-transform cursor-pointer flex-1 max-w-[200px]">
              <CardContent className="p-3 lg:p-4">
                <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-2`}>
                  <action.icon className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                </div>
                <h3 className="text-xs lg:text-sm font-semibold text-white mb-1">{action.title}</h3>
                <p className="text-xs text-gray-300 mb-2">{action.description}</p>
                <Button className="w-full glow-cyan text-xs py-1">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
              Recent Activity
            </CardTitle>
            <CardDescription>What's happening in your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">No recent activity</p>
                <p className="text-gray-400 text-sm">Start chatting or scheduling meetings to see activity here</p>
              </div>
            ) : (
              <div className="space-y-3 lg:space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg bg-white/5">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs lg:text-sm text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
              Platform Insights
            </CardTitle>
            <CardDescription>Usage analytics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between p-2 lg:p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 lg:w-4 lg:h-4 text-blue-400" />
                  <span className="text-xs lg:text-sm text-white">System Health</span>
                </div>
                <span className="text-xs lg:text-sm text-green-400 font-medium">Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
