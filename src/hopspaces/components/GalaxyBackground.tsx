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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    const numStars = 200;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-init stars on resize to ensure full coverage
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          speed: (Math.random() - 0.5) * 0.02, // Twinkle speed
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Twinkle effect
        star.opacity += star.speed;
        if (star.opacity > 1) {
          star.opacity = 1;
          star.speed = -Math.abs(star.speed);
        } else if (star.opacity < 0.2) {
          star.opacity = 0.2;
          star.speed = Math.abs(star.speed);
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#050819] ${className}`}>
      {/* Base Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}, ${colors[2] || colors[0]})`,
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Star Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Nebula Fog Layer 1 */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors[1]} 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Nebula Fog Layer 2 */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${colors[2] || colors[0]} 0%, transparent 50%)`,
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content Layer */}
      <div className="relative z-50 w-full h-full pointer-events-auto">{children}</div>
    </div>
  );
};

export default GalaxyBackground;
