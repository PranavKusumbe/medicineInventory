import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

/**
 * Footer Component
 * Animated gradient line, links, and socials
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 pt-20 pb-10 overflow-hidden">
      {/* Animated gradient line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 100%' }}
      />

      {/* Floating orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-64 h-64 rounded-full blur-3xl opacity-10 ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-purple-500' : 'bg-indigo-500'}`}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1,
          }}
          style={{
            left: `${i * 30}%`,
            top: `${i * 20}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💊</span>
              </div>
              <span className="text-2xl font-bold gradient-text">MediTrack</span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Modern medicine inventory management solution with real-time tracking and analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3 
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-2">
              {['Home', 'Inventory', 'Analytics', 'Features'].map((link, i) => (
                <motion.li 
                  key={link} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors relative group inline-block"
                  >
                    <span className="relative z-10">{link}</span>
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <motion.h3 
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Resources
            </motion.h3>
            <ul className="space-y-2">
              {['Documentation', 'API Reference', 'Support', 'Blog'].map((link, i) => (
                <motion.li 
                  key={link} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + 0.1 * i }}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors relative group inline-block"
                  >
                    <span className="relative z-10">{link}</span>
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <motion.h3 
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Connect
            </motion.h3>
            <div className="flex space-x-4">
              {[
                { icon: FaGithub, href: '#', color: 'hover:bg-gray-700' },
                { icon: FaTwitter, href: '#', color: 'hover:bg-blue-500' },
                { icon: FaLinkedin, href: '#', color: 'hover:bg-blue-600' },
                { icon: FaEnvelope, href: 'mailto:contact@meditrack.com', color: 'hover:bg-purple-600' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + 0.1 * index }}
                  whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all relative overflow-hidden group`}
                >
                  <social.icon size={20} className="relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-400 text-sm mb-2">Subscribe to updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field rounded-r-none flex-1"
                />
                <motion.button
                  whileHover={{ scale: 1.05, x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10 text-xl">→</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {currentYear} MediTrack. All rights reserved.
            </motion.p>
            
            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ color: '#60a5fa', y: -2 }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
