import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HopSpaceMood } from '../../utils/types';

interface GalaxyBackgroundProps {
  mood: HopSpaceMood;
  className?: string;
  children?: React.ReactNode;
}

const moodGradients: Record<HopSpaceMood, string[]> = {
  calm: ['#0F172A', '#1E3A8A', '#0F172A'], // Blue/Slate
  dreamy: ['#2E1065', '#7C3AED', '#4C1D95'], // Purple/Violet
  intense: ['#450A0A', '#991B1B', '#7F1D1D'], // Red/Maroon
  chaotic: ['#0F172A', '#BE123C', '#1D4ED8', '#047857'], // Multicolor
  ethereal: ['#0F172A', '#0D9488', '#3B82F6'], // Teal/Cyan/Blue
};

const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({ mood, className = '', children }) => {
  const colors = moodGradients[mood] || moodGradients['calm'];
  
  // PERFORMANCE OPTIMIZATION: CSS-only stars
  // Generates static random stars with CSS animation for twinkling
  const generateStars = (count: number) => {
    let shadow = '';
    for (let i = 0; i < count; i++) {
      shadow += `${Math.random() * 2000}px ${Math.random() * 2000}px #FFF, `;
    }
    return shadow.slice(0, -2);
  };

  // Memoize stars to prevent regeneration on render
  const smallStars = React.useMemo(() => generateStars(700), []);
  const mediumStars = React.useMemo(() => generateStars(200), []);
  const bigStars = React.useMemo(() => generateStars(100), []);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#050819] ${className}`}>
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
          }
          .star-layer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: transparent;
          }
          .stars-small { width: 1px; height: 1px; box-shadow: ${smallStars}; animation: twinkle 4s infinite; }
          .stars-medium { width: 2px; height: 2px; box-shadow: ${mediumStars}; animation: twinkle 6s infinite; }
          .stars-big { width: 3px; height: 3px; box-shadow: ${bigStars}; animation: twinkle 8s infinite; }
        `}
      </style>

      {/* Static Gradient Background (Nebula Base) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at bottom, ${colors[1]} 0%, #090A0F 100%)`,
          opacity: 0.8
        }}
      />
      
      {/* Nebula Accents */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 20% 30%, ${colors[0]}, transparent 40%),
                       radial-gradient(circle at 80% 70%, ${colors[2] || colors[0]}, transparent 40%)`
        }}
      />

      {/* CSS Stars */}
      <div className="star-layer stars-small" />
      <div className="star-layer stars-medium" />
      <div className="star-layer stars-big" />

      {/* Content Layer */}
      <div className="relative z-50 w-full h-full pointer-events-auto">{children}</div>
    </div>
  );
};

export default GalaxyBackground;
