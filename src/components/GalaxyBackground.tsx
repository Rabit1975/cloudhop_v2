import React from 'react';

interface GalaxyBackgroundProps {
  mood?: 'calm' | 'dreamy' | 'intense';
  className?: string;
  children: React.ReactNode;
}

const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({ 
  mood = 'calm', 
  className = '', 
  children 
}) => {
  const getBackgroundStyle = () => {
    switch (mood) {
      case 'calm':
        return 'bg-gradient-to-br from-blue-900/50 via-blue-800/30 to-blue-900/50 via-purple-900/20 to-purple-900/50';
      case 'dreamy':
        return 'bg-gradient-to-br from-purple-900/50 via-pink-800/30 to-purple-900/50 via-blue-900/20 to-blue-900/50';
      case 'intense':
        return 'bg-gradient-to-br from-red-900/50 via-orange-800/30 to-red-900/50 via-yellow-900/20 to-red-900/50';
      default:
        return 'bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-slate-900/50 via-purple-900/20 to-purple-900/50';
    }
  };

  return (
    <div 
      className={`w-full h-full relative ${className}`}
      style={{
        background: getBackgroundStyle(),
      }}
    >
      {/* Animated stars/particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>
      
      {children}
    </div>
  );
};

export default GalaxyBackground;
