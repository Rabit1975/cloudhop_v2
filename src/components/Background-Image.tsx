import React from 'react';

interface BackgroundImageProps {
  imageUrl?: string;
  opacity?: number;
  blur?: number;
  children?: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  opacity = 0.8,
  blur = 0,
  children,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        background: `
          linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)
        `,
      }}
    >
      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(5, 8, 25, 0.7) 0%, rgba(26, 32, 44, 0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {children}
    </div>
  );
};

export default BackgroundImage;
