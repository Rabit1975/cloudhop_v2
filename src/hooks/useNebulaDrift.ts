import { useEffect } from 'react';

export function useNebulaDrift() {
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Only update if scroll position changed significantly
          if (Math.abs(scrollY - lastScrollY) > 1) {
            document.querySelectorAll('[data-drift]').forEach(layer => {
              const speed = Number(layer.getAttribute('data-drift'));
              layer.setAttribute('style', `transform: translateY(${scrollY * speed}px)`);
            });
            lastScrollY = scrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
