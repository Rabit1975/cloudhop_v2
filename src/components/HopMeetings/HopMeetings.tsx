import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  ScreenShare, 
  MessageSquare, 
  Users, 
  Settings,
  Phone,
  Maximize2,
  Grid,
  Speaker,
  Camera,
  Calendar
} from 'lucide-react';

const HopMeetings: React.FC = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const upcomingMeetings = [
    { 
      id: 1, 
      title: 'Team Standup', 
      time: '10:00 AM', 
      duration: '30 min',
      participants: 5,
      type: 'recurring'
    },
    { 
      id: 2, 
      title: 'Project Review', 
      time: '2:00 PM', 
      duration: '1 hour',
      participants: 8,
      type: 'one-time'
    },
    { 
      id: 3, 
      title: 'Client Call', 
      time: '4:30 PM', 
      duration: '45 min',
      participants: 3,
      type: 'external'
    }
  ];

  const meetingControls = [
    {
      icon: Mic,
      activeIcon: MicOff,
      isActive: isMuted,
      label: 'Mute',
      onClick: () => setIsMuted(!isMuted),
      color: isMuted ? 'text-red-400' : 'text-white'
    },
    {
      icon: Video,
      activeIcon: VideoOff,
      isActive: isVideoOff,
      label: 'Camera',
      onClick: () => setIsVideoOff(!isVideoOff),
      color: isVideoOff ? 'text-red-400' : 'text-white'
    },
    {
      icon: ScreenShare,
      isActive: isScreenSharing,
      label: 'Share Screen',
      onClick: () => setIsScreenSharing(!isScreenSharing),
      color: isScreenSharing ? 'text-cyan-400' : 'text-white'
    },
    {
      icon: MessageSquare,
      isActive: false,
      label: 'Chat',
      onClick: () => {},
      color: 'text-white'
    },
    {
      icon: Users,
      isActive: false,
      label: 'Participants',
      onClick: () => {},
      color: 'text-white'
    },
    {
      icon: Settings,
      isActive: false,
      label: 'Settings',
      onClick: () => {},
      color: 'text-white'
    }
  ];

  if (isInCall) {
    return (
      <div className="w-full h-screen flex flex-col bg-gray-900">
        {/* Meeting Header */}
        <div className="glass-panel flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold">Team Standup</h2>
            <span className="text-gray-300 text-sm">00:12:45</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm">Recording</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Speaker className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 flex">
          <div className="flex-1 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
                YO
              </div>
              <p className="text-white text-lg">Your Name</p>
              <p className="text-gray-400 text-sm">Host</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 glass-panel border-l border-white/10 p-4">
            <h3 className="text-white font-semibold mb-4">Participants (5)</h3>
            <div className="space-y-3 mb-6">
              {['Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown'].map((name, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">Speaking</p>
                  </div>
                  <Mic className="w-4 h-4 text-green-400" />
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold mb-4">Chat</h3>
            <div className="space-y-2 mb-4 h-48 overflow-y-auto">
              <div className="p-2 rounded bg-white/5">
                <p className="text-cyan-400 text-xs font-medium">Alice</p>
                <p className="text-white text-sm">Great presentation!</p>
              </div>
              <div className="p-2 rounded bg-white/5">
                <p className="text-cyan-400 text-xs font-medium">Bob</p>
                <p className="text-white text-sm">Can you share the screen?</p>
              </div>
            </div>
            <input 
              type="text" 
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="glass-panel flex items-center justify-center gap-4 px-6 py-4 border-t border-white/10">
          {meetingControls.map((control, index) => (
            <Button
              key={index}
              variant="ghost"
              size="lg"
              onClick={control.onClick}
              className={`${control.color} hover:bg-white/10`}
            >
              {control.isActive && control.activeIcon ? (
                <control.activeIcon className="w-5 h-5" />
              ) : (
                <control.icon className="w-5 h-5" />
              )}
            </Button>
          ))}
          <Button
            variant="destructive"
            size="lg"
            onClick={() => setIsInCall(false)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Phone className="w-5 h-5 rotate-135" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">HopMeetings</h1>
        <p className="text-gray-300 text-lg">Video conferencing and collaboration platform</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="glass-panel">
          <CardContent className="p-6 text-center">
            <Video className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Start Meeting</h3>
            <p className="text-gray-300 text-sm mb-4">Create a new video meeting</p>
            <Button 
              className="w-full glow-cyan"
              onClick={() => setIsInCall(true)}
            >
              Start Now
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Schedule</h3>
            <p className="text-gray-300 text-sm mb-4">Plan future meetings</p>
            <Button variant="outline" className="w-full border-purple-400/50 text-purple-400 hover:bg-purple-400/10">
              Schedule Meeting
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Join with Code</h3>
            <p className="text-gray-300 text-sm mb-4">Enter meeting code</p>
            <input 
              type="text" 
              placeholder="Enter code"
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm mb-3"
            />
            <Button variant="outline" className="w-full border-green-400/50 text-green-400 hover:bg-green-400/10">
              Join Meeting
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
          <CardDescription>Your scheduled video conferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{meeting.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>{meeting.time}</span>
                      <span>{meeting.duration}</span>
                      <span>{meeting.participants} participants</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    meeting.type === 'recurring' ? 'bg-blue-400/20 text-blue-400' :
                    meeting.type === 'external' ? 'bg-orange-400/20 text-orange-400' :
                    'bg-green-400/20 text-green-400'
                  }`}>
                    {meeting.type}
                  </span>
                  <Button size="sm" className="glow-cyan">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HopMeetings;
