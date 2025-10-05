import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useSmoothScroll from './hooks/useSmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import Inventory from './components/Inventory';
import Features from './components/Features';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

/**
 * Main App Component
 * Integrates all sections with world-class animations and smooth scrolling
 */
function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    // GSAP ScrollTrigger configuration
    ScrollTrigger.defaults({
      markers: false,
      toggleActions: 'play none none reverse',
    });

    // Update ScrollTrigger on window resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    // Sync ScrollTrigger with Lenis
    if (window.lenis) {
      window.lenis.on('scroll', ScrollTrigger.update);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.lenis) {
        window.lenis.off('scroll', ScrollTrigger.update);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <CustomCursor />
      
      <Navbar />
      <main>
        <Hero />
        <Analytics />
        <Inventory />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
