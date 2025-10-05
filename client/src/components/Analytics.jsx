import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { medicineAPI } from '../services/api';
import { FaBoxes, FaExclamationTriangle, FaClock, FaCheckCircle } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const [refreshing, setRefreshing] = useState(false);
  const [actionStatus, setActionStatus] = useState('');
  const [showToast, setShowToast] = useState(false);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Trigger expiry check
      await medicineAPI.checkExpiry();
      // Fetch updated analytics
      await fetchAnalytics();
      showSuccessToast('Analytics refreshed successfully! ✓');
    } catch (error) {
      console.error('Error refreshing analytics:', error);
      showSuccessToast('Failed to refresh analytics ✗');
    } finally {
      setRefreshing(false);
    }
  };

  const handleExport = () => {
    try {
      const reportData = {
        date: new Date().toLocaleDateString(),
        analytics: analytics,
      };
      const dataStr = JSON.stringify(reportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `meditrack-report-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showSuccessToast('Report exported successfully! ✓');
    } catch (error) {
      console.error('Error exporting report:', error);
      showSuccessToast('Failed to export report ✗');
    }
  };

  const handleViewInsights = () => {
    // Calculate insights
    const expiryRate = analytics.totalMedicines > 0 
      ? ((analytics.expired / analytics.totalMedicines) * 100).toFixed(1)
      : 0;
    const soonToExpireRate = analytics.totalMedicines > 0
      ? ((analytics.soonToExpire / analytics.totalMedicines) * 100).toFixed(1)
      : 0;
    
    const insights = [
      `Total Medicines: ${analytics.totalMedicines}`,
      `Expired Rate: ${expiryRate}%`,
      `Soon to Expire: ${soonToExpireRate}%`,
      `Total Stock Value: $${analytics.totalStockValue}`,
      `Active Medicines: ${analytics.activeMedicines}`,
    ];
    
    alert('📊 Inventory Insights:\n\n' + insights.join('\n'));
  };

  const showSuccessToast = (message) => {
    setActionStatus(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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

          <motion.div 
            className="glass-card p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 gradient-text">Quick Actions</h3>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="group w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-between shadow-lg hover:shadow-blue-500/50 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl transition-transform duration-500 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}>🔄</span>
                  <span className="font-semibold">{refreshing ? 'Refreshing...' : 'Refresh & Check Expiry'}</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="group w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-between shadow-lg hover:shadow-purple-500/50 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📥</span>
                  <span className="font-semibold">Export JSON Report</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewInsights}
                className="group w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-between shadow-lg hover:shadow-green-500/50 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📈</span>
                  <span className="font-semibold">View Insights</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity"
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: document.getElementById('inventory').offsetTop, behavior: 'smooth' })}
                className="group w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all flex items-center justify-between shadow-lg hover:shadow-orange-500/50 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">�</span>
                  <span className="font-semibold">Manage Inventory</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity"
                />
              </motion.button>
            </div>

            {/* Toast Notification */}
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-semibold shadow-lg"
              >
                {actionStatus}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;
