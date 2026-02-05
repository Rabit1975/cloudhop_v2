import { useEffect } from 'react';

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      document.querySelectorAll('[data-parallax]').forEach(layer => {
        const speed = Number(layer.getAttribute('data-parallax'));
        layer.setAttribute('style', `transform: translateY(${scrollY * speed}px)`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
