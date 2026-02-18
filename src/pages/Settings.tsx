import { useState } from 'react';
import {
  Monitor,
  Bell,
  Shield,
  Palette,
  Volume2,
  Globe,
  Eye,
  Lock,
  Moon,
  Sun,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SettingsSection =
  | 'appearance'
  | 'notifications'
  | 'privacy'
  | 'audio'
  | 'language'
  | 'accessibility';

const SECTIONS: {
  id: SettingsSection;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'appearance',
    label: 'Appearance',
    icon: <Palette className="w-5 h-5" />,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell className="w-5 h-5" />,
  },
  {
    id: 'privacy',
    label: 'Privacy & Security',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 'audio',
    label: 'Audio & Video',
    icon: <Volume2 className="w-5 h-5" />,
  },
  {
    id: 'language',
    label: 'Language & Region',
    icon: <Globe className="w-5 h-5" />,
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: <Eye className="w-5 h-5" />,
  },
];

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button onClick={onChange} className="transition-all">
      {enabled ? (
        <ToggleRight className="w-8 h-8 text-cyan-400" />
      ) : (
        <ToggleLeft className="w-8 h-8 text-muted-foreground" />
      )}
    </button>
  );
}

function SettingRow({
  label,
  desc,
  children,
}: {
  label: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const [section, setSection] = useState<SettingsSection>('appearance');
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('cyan');
  const [fontSize, setFontSize] = useState('medium');
  const [compactMode, setCompactMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [soundNotifs, setSoundNotifs] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [dmNotifs, setDmNotifs] = useState(true);
  const [mentionNotifs, setMentionNotifs] = useState(true);
  const [channelNotifs, setChannelNotifs] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [autoGainControl, setAutoGainControl] = useState(true);
  const [hdVideo, setHdVideo] = useState(true);
  const [language, setLanguage] = useState('en');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const accents = [
    { id: 'cyan', color: 'bg-cyan-400' },
    { id: 'magenta', color: 'bg-magenta-400' },
    { id: 'purple', color: 'bg-purple-400' },
    { id: 'green', color: 'bg-green-400' },
    { id: 'orange', color: 'bg-orange-400' },
    { id: 'red', color: 'bg-red-400' },
  ];

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-purple-900/20 via-transparent to-black p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-8">
            Settings
          </h1>

          <div className="flex gap-6">
            {/* Settings Nav */}
            <div className="w-56 flex-shrink-0">
              <nav className="glass-panel rounded-xl border-cyan-400/20 overflow-hidden">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all',
                      section === s.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-r-2 border-cyan-400'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    )}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1 glass-panel rounded-xl border-cyan-400/20 p-8">
              {section === 'appearance' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Appearance
                  </h2>
                  <SettingRow
                    label="Theme"
                    desc="Choose your preferred color scheme"
                  >
                    <div className="flex gap-2">
                      {[
                        { id: 'dark', icon: <Moon className="w-4 h-4" /> },
                        { id: 'light', icon: <Sun className="w-4 h-4" /> },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={cn(
                            'px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all',
                            theme === t.id
                              ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300'
                              : 'bg-white/5 border border-white/10 text-muted-foreground'
                          )}
                        >
                          {t.icon}{' '}
                          {t.id.charAt(0).toUpperCase() + t.id.slice(1)}
                        </button>
                      ))}
                    </div>
                  </SettingRow>
                  <SettingRow
                    label="Accent Color"
                    desc="Personalize your CloudHop experience"
                  >
                    <div className="flex gap-2">
                      {accents.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setAccentColor(a.id)}
                          className={cn(
                            'w-8 h-8 rounded-full transition-all',
                            a.color,
                            accentColor === a.id
                              ? 'ring-2 ring-white ring-offset-2 ring-offset-background scale-110'
                              : 'opacity-60 hover:opacity-100'
                          )}
                        />
                      ))}
                    </div>
                  </SettingRow>
                  <SettingRow label="Font Size">
                    <div className="flex gap-2">
                      {['small', 'medium', 'large'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setFontSize(s)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                            fontSize === s
                              ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300'
                              : 'bg-white/5 border border-white/10 text-muted-foreground'
                          )}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </SettingRow>
                  <SettingRow
                    label="Compact Mode"
                    desc="Reduce spacing between messages and elements"
                  >
                    <Toggle
                      enabled={compactMode}
                      onChange={() => setCompactMode(!compactMode)}
                    />
                  </SettingRow>
                </div>
              )}

              {section === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Notifications
                  </h2>
                  <SettingRow
                    label="Push Notifications"
                    desc="Receive desktop/mobile notifications"
                  >
                    <Toggle
                      enabled={pushNotifs}
                      onChange={() => setPushNotifs(!pushNotifs)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Notification Sounds"
                    desc="Play sounds for incoming messages"
                  >
                    <Toggle
                      enabled={soundNotifs}
                      onChange={() => setSoundNotifs(!soundNotifs)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Do Not Disturb"
                    desc="Mute all notifications temporarily"
                  >
                    <Toggle enabled={dnd} onChange={() => setDnd(!dnd)} />
                  </SettingRow>
                  <SettingRow
                    label="Direct Messages"
                    desc="Notify on new direct messages"
                  >
                    <Toggle
                      enabled={dmNotifs}
                      onChange={() => setDmNotifs(!dmNotifs)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Mentions"
                    desc="Notify when someone @mentions you"
                  >
                    <Toggle
                      enabled={mentionNotifs}
                      onChange={() => setMentionNotifs(!mentionNotifs)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Channel Activity"
                    desc="Notify on all channel messages"
                  >
                    <Toggle
                      enabled={channelNotifs}
                      onChange={() => setChannelNotifs(!channelNotifs)}
                    />
                  </SettingRow>
                </div>
              )}

              {section === 'privacy' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Privacy & Security
                  </h2>
                  <SettingRow
                    label="Two-Factor Authentication"
                    desc="Add an extra layer of security"
                  >
                    <Toggle enabled={twoFA} onChange={() => setTwoFA(!twoFA)} />
                  </SettingRow>
                  <SettingRow
                    label="Activity Status"
                    desc="Let others see when you're active"
                  >
                    <Toggle
                      enabled={activityVisible}
                      onChange={() => setActivityVisible(!activityVisible)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Read Receipts"
                    desc="Let others know you've read their messages"
                  >
                    <Toggle
                      enabled={readReceipts}
                      onChange={() => setReadReceipts(!readReceipts)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Show Online Status"
                    desc="Display your online/offline status"
                  >
                    <Toggle
                      enabled={onlineStatus}
                      onChange={() => setOnlineStatus(!onlineStatus)}
                    />
                  </SettingRow>
                  <div className="mt-6 space-y-3">
                    <button className="w-full px-4 py-3 rounded-lg glass-panel border-cyan-400/20 hover:border-cyan-400/50 text-foreground text-sm font-medium flex items-center justify-between transition-all">
                      <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-cyan-400" /> Blocked Users
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="w-full px-4 py-3 rounded-lg glass-panel border-cyan-400/20 hover:border-cyan-400/50 text-foreground text-sm font-medium flex items-center justify-between transition-all">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-cyan-400" /> Data Export
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="w-full px-4 py-3 rounded-lg bg-red-500/10 border border-red-400/20 hover:border-red-400/50 text-red-300 text-sm font-medium flex items-center justify-between transition-all">
                      Delete Account
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {section === 'audio' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Audio & Video
                  </h2>
                  <SettingRow
                    label="Noise Suppression"
                    desc="Reduce background noise in calls"
                  >
                    <Toggle
                      enabled={noiseSuppression}
                      onChange={() => setNoiseSuppression(!noiseSuppression)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Echo Cancellation"
                    desc="Prevent audio feedback loops"
                  >
                    <Toggle
                      enabled={echoCancellation}
                      onChange={() => setEchoCancellation(!echoCancellation)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Auto Gain Control"
                    desc="Automatically adjust microphone volume"
                  >
                    <Toggle
                      enabled={autoGainControl}
                      onChange={() => setAutoGainControl(!autoGainControl)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="HD Video"
                    desc="Enable high-definition video in meetings"
                  >
                    <Toggle
                      enabled={hdVideo}
                      onChange={() => setHdVideo(!hdVideo)}
                    />
                  </SettingRow>
                  <SettingRow label="Input Device">
                    <select className="bg-white/5 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-foreground outline-none">
                      <option>Default Microphone</option>
                      <option>External Mic</option>
                    </select>
                  </SettingRow>
                  <SettingRow label="Output Device">
                    <select className="bg-white/5 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-foreground outline-none">
                      <option>Default Speakers</option>
                      <option>Headphones</option>
                    </select>
                  </SettingRow>
                </div>
              )}

              {section === 'language' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Language & Region
                  </h2>
                  <SettingRow label="Display Language">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-white/5 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-foreground outline-none"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                      <option value="zh">中文</option>
                      <option value="pt">Português</option>
                    </select>
                  </SettingRow>
                  <SettingRow label="Date Format">
                    <select className="bg-white/5 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-foreground outline-none">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </SettingRow>
                  <SettingRow label="Time Format">
                    <select className="bg-white/5 border border-cyan-400/30 rounded-lg px-3 py-2 text-sm text-foreground outline-none">
                      <option>12 Hour</option>
                      <option>24 Hour</option>
                    </select>
                  </SettingRow>
                </div>
              )}

              {section === 'accessibility' && (
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Accessibility
                  </h2>
                  <SettingRow
                    label="Reduced Motion"
                    desc="Minimize animations and transitions"
                  >
                    <Toggle
                      enabled={reducedMotion}
                      onChange={() => setReducedMotion(!reducedMotion)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="High Contrast"
                    desc="Increase contrast for better readability"
                  >
                    <Toggle
                      enabled={highContrast}
                      onChange={() => setHighContrast(!highContrast)}
                    />
                  </SettingRow>
                  <SettingRow
                    label="Large Text"
                    desc="Increase text size throughout the app"
                  >
                    <Toggle
                      enabled={largeText}
                      onChange={() => setLargeText(!largeText)}
                    />
                  </SettingRow>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
