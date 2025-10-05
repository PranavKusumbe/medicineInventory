import connectDB from './config/database.js';
import { seedDatabase } from './config/seed.js';
import mongoose from 'mongoose';

/**
 * Database Seeding Script
 * Run this to populate the database with sample data
 * Usage: node seed-db.js
 */

const runSeed = async () => {
  try {
    console.log('🌱 Starting database seed...\n');
    
    // Connect to database
    await connectDB();
    
    // Seed the database (true = clear existing data)
    await seedDatabase(true);
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('🚀 You can now start the server with: npm run dev\n');
    
    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();
