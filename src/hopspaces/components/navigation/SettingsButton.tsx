import React from 'react';

export const SettingsButton: React.FC = () => {
  return (
    <button
      className="
        w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
        rounded-lg text-white/60 hover:text-white text-sm
        transition-all duration-200
        flex items-center justify-center gap-2
      "
    >
      <span>⚙️</span>
      Settings
    </button>
  );
};
