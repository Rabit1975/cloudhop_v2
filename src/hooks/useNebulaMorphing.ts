import { useEffect, useState } from 'react';

export type NebulaShape = {
  noiseSeed: number;
  turbulence: number;
  swirl: number;
  clusterBias: number;
  brightness: number;
  colorShift: number;
};

const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

const lerpShape = (current: NebulaShape, target: NebulaShape, t: number): NebulaShape => ({
  noiseSeed: lerp(current.noiseSeed, target.noiseSeed, t),
  turbulence: lerp(current.turbulence, target.turbulence, t),
  swirl: lerp(current.swirl, target.swirl, t),
  clusterBias: lerp(current.clusterBias, target.clusterBias, t),
  brightness: lerp(current.brightness, target.brightness, t),
  colorShift: lerp(current.colorShift, target.colorShift, t),
});

export function useNebulaMorphing(sectionClass: string) {
  const [currentShape, setCurrentShape] = useState<NebulaShape>({
    noiseSeed: 0.5,
    turbulence: 0.3,
    swirl: 0.0,
    clusterBias: 0.5,
    brightness: 1.0,
    colorShift: 0.0,
  });

  const [targetShape, setTargetShape] = useState<NebulaShape>({
    noiseSeed: 0.5,
    turbulence: 0.3,
    swirl: 0.0,
    clusterBias: 0.5,
    brightness: 1.0,
    colorShift: 0.0,
  });

  useEffect(() => {
    const section = document.querySelector(sectionClass) as HTMLElement;
    if (!section) return;

    let animationFrame: number;
    let ticking = false;

    const updateNebula = () => {
      if (!ticking) {
        animationFrame = requestAnimationFrame(() => {
          // Smooth morph towards target
          const newShape = lerpShape(currentShape, targetShape, 0.02);
          setCurrentShape(newShape);

          // Apply shape to CSS variables
          section.style.setProperty('--nebula-noise', newShape.noiseSeed.toString());
          section.style.setProperty('--nebula-turbulence', newShape.turbulence.toString());
          section.style.setProperty('--nebula-swirl', newShape.swirl.toString());
          section.style.setProperty('--nebula-cluster', newShape.clusterBias.toString());
          section.style.setProperty('--nebula-brightness', newShape.brightness.toString());
          section.style.setProperty('--nebula-color-shift', newShape.colorShift.toString());

          ticking = false;
        });
        ticking = true;
      }
    };

    const morphInterval = setInterval(updateNebula, 50); // 20fps morphing

    return () => {
      clearInterval(morphInterval);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [currentShape, targetShape, sectionClass]);

  // AI-driven shape updates (mock for now - can connect to real AI)
  const updateShapeFromAI = (aiShape: Partial<NebulaShape>) => {
    setTargetShape(prev => ({ ...prev, ...aiShape }));
  };

  // Emotional state presets
  const setEmotionalState = (emotion: 'bloom' | 'drift' | 'surge' | 'storm' | 'frost') => {
    const presets: Record<string, Partial<NebulaShape>> = {
      bloom: {
        noiseSeed: 0.8,
        turbulence: 0.2,
        swirl: 0.1,
        clusterBias: 0.7,
        brightness: 1.3,
        colorShift: 0.4,
      },
      drift: {
        noiseSeed: 0.3,
        turbulence: 0.4,
        swirl: 0.3,
        clusterBias: 0.4,
        brightness: 0.9,
        colorShift: -0.2,
      },
      surge: {
        noiseSeed: 0.9,
        turbulence: 0.6,
        swirl: 0.2,
        clusterBias: 0.8,
        brightness: 1.4,
        colorShift: 0.6,
      },
      storm: {
        noiseSeed: 0.1,
        turbulence: 0.8,
        swirl: 0.4,
        clusterBias: 0.2,
        brightness: 0.7,
        colorShift: -0.4,
      },
      frost: {
        noiseSeed: 0.2,
        turbulence: 0.1,
        swirl: -0.1,
        clusterBias: 0.3,
        brightness: 0.6,
        colorShift: -0.6,
      },
    };

    updateShapeFromAI(presets[emotion]);
  };

  return { setEmotionalState, updateShapeFromAI, currentShape, targetShape };
}
