import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import connectDB from './config/database.js';
import medicineRoutes from './routes/medicines.js';
import Medicine from './models/Medicine.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/medicines', medicineRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Medicine Inventory API',
    version: '1.0.0',
    endpoints: {
      medicines: '/api/medicines',
      analytics: '/api/medicines/analytics'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Scheduled task: Check for expired medicines daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('🕐 Running scheduled expiry check...');
  try {
    await Medicine.updateExpiredMedicines();
  } catch (error) {
    console.error('❌ Scheduled expiry check failed:', error);
  }
});

// Also run expiry check on server start
setTimeout(async () => {
  console.log('🚀 Running initial expiry check...');
  try {
    await Medicine.updateExpiredMedicines();
  } catch (error) {
    console.error('❌ Initial expiry check failed:', error);
  }
}, 5000);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`⏰ Expiry check scheduled daily at midnight\n`);
});

export default app;
