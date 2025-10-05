import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Features Section Component
 * Scroll storytelling with GSAP timeline and cinematic effects
 */
const Features = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sticky title animation
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: 'bottom 50%',
          scrub: 1,
          pin: titleRef.current,
          pinSpacing: false,
        },
      });

      // Feature cards stagger animation with advanced timing
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.feature-card',
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        rotateX: -15,
        stagger: {
          amount: 0.5,
          from: 'start',
        },
      });

      // Progress bar animations
      gsap.from('.feature-progress', {
        scrollTrigger: {
          trigger: '.feature-progress',
          start: 'top 90%',
          end: 'top 70%',
          scrub: 1,
        },
        scaleX: 0,
        transformOrigin: 'left center',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: '🔄',
      title: 'Real-Time Updates',
      description: 'Automatic status updates for expired medicines without manual intervention',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into your inventory with live dashboards',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built with modern tech stack for optimal performance',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🔔',
      title: 'Smart Alerts',
      description: 'Get notified about medicines expiring within 30 days',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🔍',
      title: 'Advanced Search',
      description: 'Powerful search and filter capabilities to find any medicine instantly',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Beautiful interface that works seamlessly on all devices',
      color: 'from-rose-500 to-red-500',
    },
  ];

  return (
    <motion.section 
      id="features" 
      ref={sectionRef} 
      className="py-32 bg-gray-900/50 overflow-hidden relative"
      style={{ opacity, scale }}
    >
      <div className="container mx-auto px-6">
        {/* Sticky title */}
        <motion.div
          ref={titleRef}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20 sticky top-24 z-10 bg-gray-900/80 backdrop-blur-lg py-8 rounded-2xl"
        >
          <h2 className="text-6xl md:text-7xl font-bold gradient-text mb-6">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Everything you need to manage your medicine inventory
          </p>
        </motion.div>

        <div ref={carouselRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card glass-card p-8 hover-glow relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${feature.color.split(' ')[1].replace('from-', '#')}, ${feature.color.split(' ')[2].replace('to-', '#')})`,
                  opacity: 0.1,
                }}
              />

              {/* Icon with 3D effect */}
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-2xl relative z-10`}
                whileHover={{ 
                  rotateZ: 360,
                  scale: 1.1,
                }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                {feature.icon}
                
                {/* Pinging effect for active icon */}
                {index === 0 && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-blue-500"
                    animate={{
                      scale: [1, 1.3, 1.3],
                      opacity: [0.7, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                )}
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 relative z-10">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">{feature.description}</p>

              {/* Progress bar with gradient */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                className={`feature-progress h-1 bg-gradient-to-r ${feature.color} mt-6 rounded-full relative z-10`}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: 'easeInOut',
                }}
                style={{ transform: 'skewX(-20deg)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced statistics panel */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-32 glass-card p-16 text-center relative overflow-hidden"
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          />

          <motion.h3 
            className="text-4xl md:text-5xl font-bold gradient-text mb-8 relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose MediTrack?
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 relative z-10">
            {[
              { value: '99.9%', label: 'Uptime Guarantee', color: 'text-blue-400' },
              { value: '24/7', label: 'Real-Time Monitoring', color: 'text-purple-400' },
              { value: '100%', label: 'Data Accuracy', color: 'text-green-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                whileHover={{ scale: 1.1, y: -10 }}
              >
                <motion.div 
                  className={`text-5xl md:text-6xl font-bold ${stat.color} mb-3`}
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 40px rgba(139, 92, 246, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;
