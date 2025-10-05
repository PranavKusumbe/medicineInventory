import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from './Hero3D';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Component
 * Large animated gradient headline with smooth animations and 3D elements
 */
const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);
  const parallaxRef3 = useRef(null);

  useEffect(() => {
    // GSAP entrance animations with advanced timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered reveal from bottom
      tl.from('.hero-text', {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: {
          amount: 0.4,
          from: 'start',
        },
        clearProps: 'all',
      })
      .from('.hero-cta', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        clearProps: 'all',
      }, '-=0.4');

      // Parallax scrolling for background shapes
      gsap.to(parallaxRef1.current, {
        y: 300,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(parallaxRef2.current, {
        y: 200,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(parallaxRef3.current, {
        y: 150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Floating animation for shapes
      gsap.to('.floating-shape', {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden animated-bg"
    >
      {/* 3D Background */}
      <Hero3D />

      {/* Animated parallax background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          ref={parallaxRef1}
          className="floating-shape absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        ></div>
        <div 
          ref={parallaxRef2}
          className="floating-shape absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        ></div>
        <div 
          ref={parallaxRef3}
          className="floating-shape absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 
            ref={titleRef}
            className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold mb-6 gradient-text leading-tight"
            style={{ backgroundSize: '200% auto' }}
          >
            Smart Medicine
            <br />
            Management
          </h1>
          
          <p className="hero-text text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your pharmacy inventory with real-time tracking, 
            automatic expiry alerts, and powerful analytics
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#inventory"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
                rotateZ: 2,
              }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-3 px-8 py-4 text-lg"
            >
              <span>View Inventory</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>

            <motion.a
              href="#analytics"
              whileHover={{ 
                scale: 1.05,
                rotateZ: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center space-x-3 px-8 py-4 text-lg"
            >
              <span>See Analytics</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📊
              </motion.span>
            </motion.a>
          </div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            ></motion.div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Scroll to explore</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
