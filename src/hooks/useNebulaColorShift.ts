import { useEffect } from 'react';

export function useNebulaColorShift(sectionClass: string) {
  useEffect(() => {
    const section = document.querySelector(sectionClass) as HTMLElement;
    if (!section) return;

    let ticking = false;
    let lastProgress = -1;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Progress from 0 → 1 as the section scrolls through view
          const progress = Math.min(1, Math.max(0, 1 - rect.top / viewportHeight));

          // Only update if progress changed significantly
          if (Math.abs(progress - lastProgress) > 0.01) {
            // Interpolate colors
            const startColor = `rgba(${10 + progress * 40}, ${15 + progress * 20}, ${43 + progress * 30}, 1)`;
            const endColor = `rgba(${5 + progress * 20}, ${6 + progress * 10}, ${13 + progress * 20}, 1)`;

            section.style.setProperty('--nebula-start', startColor);
            section.style.setProperty('--nebula-end', endColor);
            lastProgress = progress;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionClass]);
}
