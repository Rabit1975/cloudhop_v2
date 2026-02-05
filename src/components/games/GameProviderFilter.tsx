import React from 'react';
import { GAME_PROVIDERS } from '../../data/gameProviders';

interface GameProviderFilterProps {
  selectedProvider: string | null;
  onProviderChange: (providerId: string | null) => void;
}

const GameProviderFilter: React.FC<GameProviderFilterProps> = ({
  selectedProvider,
  onProviderChange,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onProviderChange(null)}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
          selectedProvider === null
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'bg-white/10 text-gray-300 hover:bg-white/20'
        }`}
      >
        🎮 All Providers
      </button>

      {GAME_PROVIDERS.map(provider => (
        <button
          key={provider.id}
          onClick={() => onProviderChange(provider.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
            selectedProvider === provider.id
              ? 'text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
          style={{
            backgroundColor: selectedProvider === provider.id ? provider.color : undefined,
          }}
        >
          <span>{provider.icon}</span>
          <span>{provider.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GameProviderFilter;
