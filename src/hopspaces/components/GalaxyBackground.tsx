import React from 'react';
import { HopSpaceMood } from '../../utils/types';

interface GalaxyBackgroundProps {
  mood?: HopSpaceMood;
  className?: string;
  children?: React.ReactNode;
}

const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({ className = '', children }) => {
  return (
    <div className={`nebula-bg w-full h-full relative overflow-hidden ${className}`}>
      {/* 
        PERFORMANCE OPTIMIZATION:
        Using pure CSS for star twinkling to avoid JS main thread blocking.
        Animations are "powered way down" (slow, low opacity) as requested.
      */}
      <style>
        {`
          @keyframes twinkle-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            animation: twinkle-slow 4s infinite ease-in-out;
          }
        `}
      </style>
      
      {/* Static Star Field - generated once via fixed positions for performance */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="star" style={{ top: '10%', left: '20%', width: '2px', height: '2px', animationDelay: '0s' }} />
        <div className="star" style={{ top: '30%', left: '80%', width: '3px', height: '3px', animationDelay: '1s' }} />
        <div className="star" style={{ top: '50%', left: '40%', width: '1px', height: '1px', animationDelay: '2s' }} />
        <div className="star" style={{ top: '70%', left: '10%', width: '2px', height: '2px', animationDelay: '3s' }} />
        <div className="star" style={{ top: '85%', left: '85%', width: '2px', height: '2px', animationDelay: '0.5s' }} />
        <div className="star" style={{ top: '15%', left: '60%', width: '1px', height: '1px', animationDelay: '1.5s' }} />
        <div className="star" style={{ top: '45%', left: '90%', width: '2px', height: '2px', animationDelay: '2.5s' }} />
        <div className="star" style={{ top: '90%', left: '30%', width: '3px', height: '3px', animationDelay: '3.5s' }} />
      </div>

      {/* Content Layer */}
      <div className="relative z-50 w-full h-full pointer-events-auto">{children}</div>
    </div>
  );
};

export default GalaxyBackground;
