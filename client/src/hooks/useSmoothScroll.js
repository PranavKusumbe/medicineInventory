import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook for Lenis smooth scrolling
 * Provides buttery smooth scroll experience
 */
const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for other components
    window.lenis = lenis;

    // Cleanup
    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
};

export default useSmoothScroll;
