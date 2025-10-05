import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { medicineAPI } from '../services/api';
import { FaBoxes, FaExclamationTriangle, FaClock, FaCheckCircle } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Analytics Section Component
 * Displays real-time metrics with animated counters
 */
const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalStockValue: 0,
    soonToExpire: 0,
    expired: 0,
    totalMedicines: 0,
    activeMedicines: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    // Refresh analytics every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await medicineAPI.getAnalytics();
      setAnalytics(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, prefix = '', suffix = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!cardRef.current || !isHovered) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = ((y - centerY) / centerY) * -10;
      const tiltY = ((x - centerX) / centerX) * 10;
      
      setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        whileHover={{ 
          y: -15,
          boxShadow: `0 25px 50px rgba(0,0,0,0.4), 0 0 100px ${color === 'text-green-400' ? 'rgba(16, 185, 129, 0.3)' : color === 'text-blue-400' ? 'rgba(59, 130, 246, 0.3)' : color === 'text-yellow-400' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        }}
        className="glass-card p-8 relative overflow-hidden group"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${isHovered ? '50%' : '0%'} ${isHovered ? '50%' : '0%'}, ${color === 'text-green-400' ? 'rgba(16, 185, 129, 0.1)' : color === 'text-blue-400' ? 'rgba(59, 130, 246, 0.1)' : color === 'text-yellow-400' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(239, 68, 68, 0.1)'}, transparent 70%)`,
          }}
        />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <motion.div 
            className={`text-5xl ${color}`}
            animate={{ 
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <motion.div 
            className={`text-sm px-4 py-2 rounded-full ${color === 'text-green-400' ? 'bg-green-500/20 text-green-400' : color === 'text-blue-400' ? 'bg-blue-500/20 text-blue-400' : color === 'text-yellow-400' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'} font-semibold backdrop-blur-sm`}
            animate={{
              boxShadow: [
                '0 0 10px rgba(59, 130, 246, 0.3)',
                '0 0 20px rgba(139, 92, 246, 0.5)',
                '0 0 10px rgba(59, 130, 246, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● Live
          </motion.div>
        </div>
        
        <h3 className="text-gray-400 text-sm mb-3 relative z-10 font-medium tracking-wide uppercase">{title}</h3>
        
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="text-5xl font-bold gradient-text relative z-10"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          {prefix}
          <CountUp end={value} duration={2.5} />
          {suffix}
        </motion.div>

        {/* Particle effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${color === 'text-green-400' ? 'bg-green-400' : color === 'text-blue-400' ? 'bg-blue-400' : color === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}
                initial={{ 
                  x: '50%', 
                  y: '50%',
                  opacity: 1,
                }}
                animate={{ 
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  opacity: 0,
                  scale: [1, 2, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            border: `1px solid ${color === 'text-green-400' ? 'rgba(16, 185, 129, 0.3)' : color === 'text-blue-400' ? 'rgba(59, 130, 246, 0.3)' : color === 'text-yellow-400' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    );
  };

  const CountUp = ({ end, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <>{count}</>;
  };

  if (loading) {
    return (
      <section id="analytics" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="analytics" className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-6xl font-bold gradient-text mb-4"
            initial={{ scale: 0.9, filter: 'blur(10px)' }}
            whileInView={{ scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            Real-Time Analytics
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Monitor your inventory performance at a glance
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Stock Value"
            value={analytics.totalStockValue}
            icon={<FaBoxes />}
            color="text-green-400"
            prefix="$"
          />
          
          <StatCard
            title="Total Medicines"
            value={analytics.totalMedicines}
            icon={<FaCheckCircle />}
            color="text-blue-400"
          />
          
          <StatCard
            title="Soon to Expire"
            value={analytics.soonToExpire}
            icon={<FaClock />}
            color="text-yellow-400"
          />
          
          <StatCard
            title="Expired Items"
            value={analytics.expired}
            icon={<FaExclamationTriangle />}
            color="text-red-400"
          />
        </div>

        {/* Additional metrics */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-4">Inventory Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Active Medicines</span>
                  <span className="text-green-400 font-semibold">{analytics.activeMedicines}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(analytics.activeMedicines / analytics.totalMedicines) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  ></motion.div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Expired Items</span>
                  <span className="text-red-400 font-semibold">{analytics.expired}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(analytics.expired / analytics.totalMedicines) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-gradient-to-r from-red-500 to-rose-500 h-2 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchAnalytics}
                className="w-full px-4 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-between"
              >
                <span>Refresh Analytics</span>
                <span>🔄</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-between"
              >
                <span>Export Report</span>
                <span>📥</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-between"
              >
                <span>View Insights</span>
                <span>📈</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;
