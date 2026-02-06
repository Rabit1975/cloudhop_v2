import React from 'react';

interface BackgroundImageProps {
  imageUrl?: string;
  opacity?: number;
  blur?: number;
  children?: React.ReactNode;
  showNebula?: boolean; // Add nebula control
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  opacity = 0.8,
  blur = 0,
  children,
  showNebula = true, // Default to showing nebula
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
        background: showNebula
          ? `
            radial-gradient(ellipse at top left, rgba(83, 200, 255, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(16, 185, 129, 0.2) 0%, transparent 40%),
            linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)
          `
          : '#050819', // Simple dark background when no nebula
      }}
    >
      {/* Animated nebula particles for more dynamic effect */}
      {showNebula && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(83, 200, 255, 0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'float 8s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '60%',
              right: '20%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(35px)',
              animation: 'float 10s ease-in-out infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '30%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              animation: 'float 12s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: '40%',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(25px)',
              animation: 'float 15s ease-in-out infinite reverse',
            }}
          />
        </>
      )}

      {/* Dark overlay for better text readability - only when nebula is shown */}
      {showNebula && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(135deg, rgba(5, 8, 25, 0.6) 0%, rgba(26, 32, 44, 0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>

      {children}
    </div>
  );
};

export default BackgroundImage;
