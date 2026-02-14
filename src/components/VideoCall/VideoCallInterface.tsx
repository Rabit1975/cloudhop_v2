import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff, 
  MessageSquare, 
  Users, 
  Settings,
  Phone,
  Share2
} from 'lucide-react';

interface VideoCallInterfaceProps {
  roomId?: string;
  onEndCall?: () => void;
}

export function VideoCallInterface({ roomId = 'default', onEndCall }: VideoCallInterfaceProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([
    { id: '1', name: 'You', video: true, audio: true, isLocal: true },
    { id: '2', name: 'Alice', video: true, audio: true, isLocal: false },
    { id: '3', name: 'Bob', video: true, audio: false, isLocal: false }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'Alice', message: 'Hey everyone!', time: '10:30 AM' },
    { id: '2', sender: 'Bob', message: 'Ready for the meeting', time: '10:32 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Timer for call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true, 
          audio: true 
        });
        setIsScreenSharing(true);
        console.log('Screen sharing started:', stream);
      } else {
        setIsScreenSharing(false);
        console.log('Screen sharing stopped');
      }
    } catch (err) {
      console.error('Screen sharing error:', err);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? 'Recording stopped' : 'Recording started');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">CloudHop Video Call</h1>
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              {participants.length} participants
            </Badge>
            <span className="text-white/60 font-mono">{formatTime(callDuration)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRecording}
              className={`text-white/80 hover:text-white hover:bg-white/10 ${
                isRecording ? 'text-red-400' : ''
              }`}
            >
              {isRecording ? '⏹️ Recording' : '⏺️ Record'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleScreenShare}
              className={`text-white/80 hover:text-white hover:bg-white/10 ${
                isScreenSharing ? 'text-blue-400' : ''
              }`}
            >
              {isScreenSharing ? <MonitorOff className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={onEndCall}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Phone className="w-4 h-4" />
              End Call
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Video Area */}
        <div className="flex-1 relative bg-black">
          {/* Remote Video Grid */}
          <div className="grid grid-cols-2 gap-2 p-4 h-full">
            {participants.map(participant => (
              <div key={participant.id} className="relative bg-gray-900 rounded-lg overflow-hidden">
                <video
                  ref={participant.isLocal ? localVideoRef : remoteVideoRef}
                  autoPlay
                  muted={participant.isLocal}
                  className="w-full h-full object-cover"
                  poster={`https://ui-avatars.com/api/?name=${participant.name}&background=random`}
                />
                
                {/* Participant Info Overlay */}
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                  <p className="text-white text-sm font-medium">{participant.name}</p>
                  <div className="flex items-center gap-1">
                    {!participant.video && <VideoOff className="w-3 h-3 text-red-400" />}
                    {!participant.audio && <MicOff className="w-3 h-3 text-red-400" />}
                  </div>
                </div>
                
                {/* Local Video Indicator */}
                {participant.isLocal && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                      You
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 bg-gray-900 border-l border-white/10 flex flex-col">
          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-medium text-sm">{msg.sender}:</span>
                    <span className="text-white/60 text-xs">{msg.time}</span>
                  </div>
                  <p className="text-white/80 text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/40"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Participants List */}
          <div className="border-t border-white/10 p-4">
            <h3 className="text-white font-medium flex items-center gap-2 mb-3">
              <Users className="w-4 h-4" />
              Participants ({participants.length})
            </h3>
            <div className="space-y-2">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center gap-2 p-2 rounded bg-white/5">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {participant.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{participant.name}</p>
                    <div className="flex items-center gap-1">
                      {participant.video ? (
                        <Video className="w-3 h-3 text-green-400" />
                      ) : (
                        <VideoOff className="w-3 h-3 text-red-400" />
                      )}
                      {participant.audio ? (
                        <Mic className="w-3 h-3 text-green-400" />
                      ) : (
                        <MicOff className="w-3 h-3 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full p-2 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAudioOn(!isAudioOn)}
          className={`rounded-full p-3 ${
            isAudioOn ? 'text-white hover:bg-white/20' : 'text-red-400 hover:bg-red-500/20'
          }`}
        >
          {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`rounded-full p-3 ${
            isVideoOn ? 'text-white hover:bg-white/20' : 'text-red-400 hover:bg-red-500/20'
          }`}
        >
          {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleScreenShare}
          className={`rounded-full p-3 ${
            isScreenSharing ? 'text-blue-400 hover:bg-blue-500/20' : 'text-white hover:bg-white/20'
          }`}
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
