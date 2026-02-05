import { useEffect } from 'react';

export function useParallaxDrift() {
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.05;
      document.documentElement.style.setProperty('--scroll-offset', `${offset}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
