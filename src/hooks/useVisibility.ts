import { useEffect, useRef, useState } from 'react';
import { VisibilityManager } from '../utils/visibilityManager';

export function useVisibility(id: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting;
        setVisible(isVisible);
        VisibilityManager.setComponentVisible(id, isVisible);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return { ref, visible };
}
