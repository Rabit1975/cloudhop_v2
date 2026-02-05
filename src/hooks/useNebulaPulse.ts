import { useEffect } from 'react';

export function useNebulaPulse() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleMove = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.querySelectorAll('.nebula-layer').forEach(layer => {
            const htmlElement = layer as HTMLElement;
            htmlElement.style.setProperty('--pulse', '1.15');
            setTimeout(() => htmlElement.style.setProperty('--pulse', '1'), 200);
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const velocity = Math.abs(window.scrollY - lastScrollY);
          lastScrollY = window.scrollY;

          const intensity = Math.min(1.3, 1 + velocity / 300);

          document.querySelectorAll('.nebula-layer').forEach(layer => {
            const htmlElement = layer as HTMLElement;
            htmlElement.style.setProperty('--pulse', intensity.toString());
            setTimeout(() => htmlElement.style.setProperty('--pulse', '1'), 300);
          });
          ticking = false;
        });
        ticking = true;
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
