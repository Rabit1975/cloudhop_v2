import { useEffect } from 'react';

export function useParticleTrails() {
  useEffect(() => {
    let particleCount = 0;
    const MAX_PARTICLES = 20; // Limit total particles
    let lastScrollTime = 0;
    let lastMouseMoveTime = 0;

    const createParticle = (x: number, y: number, className: string = 'particle') => {
      // Limit particle count to prevent performance issues
      if (particleCount >= MAX_PARTICLES) return;

      particleCount++;
      const particle = document.createElement('div');
      particle.className = className;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const duration = 2000 + Math.random() * 1000; // Reduced duration range
      particle.style.animation = `particleFloat ${duration}ms ease-out forwards`;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
        particleCount--;
      }, duration);
    };

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle mouse events to reduce CPU load
      if (now - lastMouseMoveTime < 100) return;
      lastMouseMoveTime = now;

      if (Math.random() < 0.2) {
        // Reduced probability
        createParticle(e.clientX, e.clientY);
      }
    };

    const handleScroll = () => {
      const now = Date.now();
      // Throttle scroll events to reduce CPU load
      if (now - lastScrollTime < 200) return;
      lastScrollTime = now;

      if (Math.random() < 0.05) {
        // Greatly reduced probability
        createParticle(window.innerWidth * Math.random(), window.innerHeight * Math.random());
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
