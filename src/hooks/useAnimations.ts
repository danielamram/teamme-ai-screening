import { useEffect, useState } from 'react';

/**
 * Hook for score counter animation
 */
export function useCountUp(
  end: number,
  duration: number = 1000,
  start: number = 0
): number {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - (1 - progress) ** 3;
      const currentCount = Math.floor(start + (end - start) * easeOut);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
}

/**
 * Hook for fade-in animation
 */
export function useFadeIn(delay: number = 0): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return visible;
}

/**
 * Hook for shimmer loading animation
 */
export function useShimmer(isLoading: boolean): boolean {
  const [shimmer, setShimmer] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShimmer(true);
      return undefined;
    }
    const timer = setTimeout(() => {
      setShimmer(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return shimmer;
}
