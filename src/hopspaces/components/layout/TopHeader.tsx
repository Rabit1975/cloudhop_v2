import React, { useState } from 'react';

interface TopHeaderProps {
  user: any;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const mockNotifications = [
    { id: 1, text: 'Alice joined your Music Space', time: '2m ago', read: false },
    { id: 2, text: 'New comment on your Fluid Art', time: '1h ago', read: false },
    { id: 3, text: 'Bob mentioned you in Ideas Space', time: '3h ago', read: true },
  ];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="h-14 bg-[#0a0d1f] border-b border-white/10 flex items-center px-4 gap-4">
      {/* HopSpaces Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">H</span>
        </div>
        <span className="text-white font-bold text-lg">HopSpaces</span>
      </div>

      {/* Galaxy Navigation Button */}
      <button
        className="
        p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
        rounded-lg text-white/80 hover:text-white text-sm
        transition-all duration-200
        flex items-center gap-2
      "
      >
        <span>🌌</span>
        <span className="hidden sm:inline">Galaxy</span>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search spaces, members, or content..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="
              w-full p-2 pl-8 bg-white/10 border border-white/20 rounded-lg
              text-white placeholder-white/40 text-sm
              focus:outline-none focus:border-white/40 focus:bg-white/15
              transition-all duration-200
            "
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/40">🔍</div>
        </div>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="
            p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
            rounded-lg text-white/80 hover:text-white text-sm relative
            transition-all duration-200
          "
        >
          <span>🔔</span>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">{unreadCount}</span>
            </div>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-12 w-80 bg-[#0a0d1f] border border-white/20 rounded-lg shadow-xl z-50">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-medium">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {mockNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`
                    p-4 border-b border-white/10 hover:bg-white/5 transition-colors
                    ${!notification.read ? 'bg-white/5' : ''}
                  `}
                >
                  <div className="text-white text-sm">{notification.text}</div>
                  <div className="text-white/60 text-xs mt-1">{notification.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="
            p-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
            rounded-lg text-white/80 hover:text-white text-sm
            transition-all duration-200
            flex items-center gap-2
          "
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <span className="hidden sm:inline text-sm">{user?.name || 'User'}</span>
          <span className="text-white/40">▼</span>
        </button>

        {showUserMenu && (
          <div className="absolute right-0 top-12 w-48 bg-[#0a0d1f] border border-white/20 rounded-lg shadow-xl z-50">
            <div className="py-2">
              <button className="w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/5 text-sm transition-colors">
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/5 text-sm transition-colors">
                Settings
              </button>
              <button className="w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/5 text-sm transition-colors">
                Help
              </button>
              <div className="border-t border-white/10 my-2"></div>
              <button className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-white/5 text-sm transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
