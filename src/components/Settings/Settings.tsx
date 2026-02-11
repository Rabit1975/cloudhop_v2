import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Volume2, 
  Globe, 
  Database,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Eye,
  Lock,
  Key,
  Mail,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Check,
  X,
  Info,
  AlertTriangle
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    chat: true,
    meetings: true,
    updates: false
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'audio', label: 'Audio & Video', icon: Volume2 },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'data', label: 'Data & Storage', icon: Database },
    { id: 'devices', label: 'Connected Devices', icon: Smartphone }
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6 p-6 rounded-lg border border-white/10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
          YO
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">Your Name</h3>
          <p className="text-gray-300 mb-4">your.email@example.com</p>
          <div className="flex gap-2">
            <Button size="sm" className="glow-cyan">Change Photo</Button>
            <Button size="sm" variant="outline">Remove</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">Display Name</label>
          <input 
            type="text" 
            defaultValue="Your Name"
            className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            defaultValue="your.email@example.com"
            className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">Phone</label>
          <input 
            type="tel" 
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">Location</label>
          <input 
            type="text" 
            placeholder="City, Country"
            className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Bio</label>
        <textarea 
          rows={4}
          placeholder="Tell us about yourself..."
          className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
        {Object.entries({
          email: 'Receive email updates about your account activity',
          chat: 'New messages and chat notifications',
          meetings: 'Meeting reminders and invitations',
          updates: 'Product updates and announcements'
        }).map(([key, description]) => (
          <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-medium capitalize">{key}</p>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifications] }))}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications[key as keyof typeof notifications] 
                  ? 'bg-cyan-400' 
                  : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                notifications[key as keyof typeof notifications] 
                  ? 'translate-x-6' 
                  : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Push Notifications</h3>
        <div className="p-4 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white font-medium">Desktop Notifications</p>
              <p className="text-gray-300 text-sm">Receive notifications in your browser</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-cyan-400">
              <div className="w-5 h-5 bg-white rounded-full translate-x-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Privacy</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-white font-medium">Profile Visibility</p>
                <p className="text-gray-300 text-sm">Control who can see your profile</p>
              </div>
            </div>
            <select className="px-3 py-1 bg-black/30 border border-white/20 rounded-lg text-white text-sm">
              <option>Everyone</option>
              <option>Contacts Only</option>
              <option>Nobody</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-gray-300 text-sm">Add an extra layer of security</p>
              </div>
            </div>
            <Button size="sm" className="glow-cyan">Enable</Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-white font-medium">Change Password</p>
                <p className="text-gray-300 text-sm">Update your account password</p>
              </div>
            </div>
            <Button size="sm" variant="outline">Change</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Data Management</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">Download Your Data</p>
                <p className="text-gray-300 text-sm">Get a copy of all your data</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-green-400/50 text-green-400">
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-white font-medium">Delete Account</p>
                <p className="text-gray-300 text-sm">Permanently remove your account</p>
              </div>
            </div>
            <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              darkMode 
                ? 'border-cyan-400 bg-cyan-400/10' 
                : 'border-white/20 hover:border-white/40'
            }`}
            onClick={() => setDarkMode(true)}
          >
            <div className="flex items-center gap-3 mb-3">
              <Moon className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-medium">Dark Mode</span>
            </div>
            <p className="text-gray-300 text-sm">Easy on the eyes, perfect for night use</p>
          </div>

          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              !darkMode 
                ? 'border-cyan-400 bg-cyan-400/10' 
                : 'border-white/20 hover:border-white/40'
            }`}
            onClick={() => setDarkMode(false)}
          >
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Light Mode</span>
            </div>
            <p className="text-gray-300 text-sm">Clean and bright interface</p>
          </div>

          <div className="p-4 rounded-lg border border-white/20 opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-3 mb-3">
              <Monitor className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">System</span>
            </div>
            <p className="text-gray-300 text-sm">Follow your system preference</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Customization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Accent Color</label>
            <div className="flex gap-2">
              {['bg-cyan-400', 'bg-purple-400', 'bg-green-400', 'bg-red-400', 'bg-yellow-400'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-white/20`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Font Size</label>
            <select className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Extra Large</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return (
          <div className="text-center py-12">
            <Info className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-300">This settings section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-300 text-lg">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="glass-panel">
            <CardContent className="p-4">
              <nav className="space-y-1">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="glass-panel">
            <CardContent className="p-6">
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
