import { useState } from 'react';
import {
  Camera,
  Edit3,
  Save,
  MapPin,
  Link2,
  Calendar,
  Star,
  MessageSquare,
  Gamepad2,
  Music,
  Clock,
  Trophy,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logo3d from '@/assets/logo-3d-rabbit.png';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('CloudHopper');
  const [bio, setBio] = useState(
    'Just a cosmic hopper exploring the cloud ☁️✨'
  );
  const [location, setLocation] = useState('The Nebula');
  const [website, setWebsite] = useState('cloudhop.app');
  const [status, setStatus] = useState('online');
  const [statusMessage, setStatusMessage] = useState('Hop In, Cloud On!');

  const stats = [
    {
      label: 'Messages Sent',
      value: '12,847',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      label: 'Games Played',
      value: '342',
      icon: <Gamepad2 className="w-4 h-4" />,
    },
    {
      label: 'Music Listened',
      value: '89h',
      icon: <Music className="w-4 h-4" />,
    },
    {
      label: 'Meeting Hours',
      value: '156h',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: 'Achievements',
      value: '28',
      icon: <Trophy className="w-4 h-4" />,
    },
    { label: 'Friends', value: '64', icon: <Heart className="w-4 h-4" /> },
  ];

  const achievements = [
    { name: 'Early Hopper', desc: 'Joined during beta', emoji: '🐰' },
    { name: 'Social Butterfly', desc: 'Sent 10,000 messages', emoji: '🦋' },
    { name: 'Game Master', desc: 'Played 100+ games', emoji: '🎮' },
    { name: 'Meeting Pro', desc: 'Hosted 50+ meetings', emoji: '📹' },
    { name: 'Music Lover', desc: 'Listened 50+ hours', emoji: '🎵' },
    { name: 'Space Explorer', desc: 'Created 5+ spaces', emoji: '🌍' },
  ];

  const activity = [
    {
      text: 'Played RetroBlast in GameHub',
      time: '2 minutes ago',
      color: 'text-cyan-400',
    },
    {
      text: 'Sent a message in #general',
      time: '15 minutes ago',
      color: 'text-magenta-400',
    },
    {
      text: 'Hosted a meeting with 4 participants',
      time: '1 hour ago',
      color: 'text-purple-400',
    },
    {
      text: 'Listened to Lo-Fi Chill playlist',
      time: '3 hours ago',
      color: 'text-green-400',
    },
  ];

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6">
        <div className="max-w-4xl mx-auto">
          {/* Banner */}
          <div className="relative h-48 rounded-2xl overflow-hidden mb-16 glass-panel border-cyan-400/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/40 via-magenta-600/40 to-purple-600/40" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-40" />

            {/* Avatar */}
            <div className="absolute -bottom-12 left-8 z-10">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-500 to-magenta-500 p-1 shadow-xl shadow-cyan-500/30">
                  <img
                    src={logo3d}
                    alt="Avatar"
                    className="w-full h-full rounded-xl object-cover bg-background"
                  />
                </div>
                <button className="absolute bottom-1 right-1 p-1.5 rounded-lg bg-cyan-500 text-black hover:opacity-90 transition-all">
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <div
                  className={cn(
                    'absolute top-1 right-1 w-4 h-4 rounded-full border-2 border-background',
                    status === 'online'
                      ? 'bg-green-500'
                      : status === 'away'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                  )}
                />
              </div>
            </div>

            {/* Edit button */}
            <button
              onClick={() => setEditing(!editing)}
              className="absolute top-4 right-4 px-4 py-2 rounded-lg glass-panel border-cyan-400/30 hover:border-cyan-400/60 text-foreground text-sm font-medium flex items-center gap-2 transition-all z-10"
            >
              {editing ? (
                <>
                  <Save className="w-4 h-4" /> Save Profile
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Info */}
          <div className="mb-8 pl-2">
            <div className="flex items-center gap-4 mb-2">
              {editing ? (
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="text-3xl font-black bg-transparent border-b-2 border-cyan-400/50 text-foreground outline-none"
                />
              ) : (
                <h1 className="text-3xl font-black text-foreground">
                  {displayName}
                </h1>
              )}
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                PRO
              </span>
            </div>
            {editing ? (
              <input
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                className="text-sm bg-transparent border-b border-cyan-400/30 text-cyan-300 outline-none mb-3 w-64"
              />
            ) : (
              <p className="text-sm text-cyan-300 mb-3">💬 {statusMessage}</p>
            )}
            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="text-sm bg-white/5 border border-cyan-400/30 text-muted-foreground rounded-lg p-3 outline-none w-full resize-none"
                rows={2}
              />
            ) : (
              <p className="text-muted-foreground">{bio}</p>
            )}
            <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {location}
              </span>
              <span className="flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5" /> {website}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Joined Jan 2025
              </span>
            </div>
            {editing && (
              <div className="mt-4 flex gap-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-white/5 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-foreground outline-none"
                >
                  <option value="online">🟢 Online</option>
                  <option value="away">🟡 Away</option>
                  <option value="dnd">🔴 Do Not Disturb</option>
                  <option value="offline">⚫ Invisible</option>
                </select>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-panel rounded-xl p-4 border-cyan-400/20 text-center hover:border-cyan-400/40 transition-all"
              >
                <div className="text-cyan-400 flex justify-center mb-2">
                  {s.icon}
                </div>
                <p className="text-lg font-black text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Achievements */}
            <div className="glass-panel rounded-xl p-6 border-magenta-400/20">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-magenta-400" /> Achievements
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((a) => (
                  <div
                    key={a.name}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-magenta-400/30 transition-all"
                  >
                    <div className="text-2xl mb-1">{a.emoji}</div>
                    <p className="text-sm font-bold text-foreground">
                      {a.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel rounded-xl p-6 border-cyan-400/20">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" /> Recent Activity
              </h2>
              <div className="space-y-4">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className={cn('text-sm font-medium', a.color)}>
                        {a.text}
                      </p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
