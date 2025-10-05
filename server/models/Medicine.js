import mongoose from 'mongoose';

/**
 * Medicine Schema
 * Defines the structure for medicine documents in MongoDB
 */
const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Medicine name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active'
  }
}, {
  timestamps: true
});

/**
 * Middleware: Check expiry status before saving
 * Automatically marks medicine as expired if expiry date has passed
 */
medicineSchema.pre('save', function(next) {
  const currentDate = new Date();
  const expiryDate = new Date(this.expiryDate);
  
  // Reset time portion for accurate date comparison
  currentDate.setHours(0, 0, 0, 0);
  expiryDate.setHours(0, 0, 0, 0);
  
  if (expiryDate < currentDate) {
    this.status = 'expired';
  } else {
    this.status = 'active';
  }
  
  next();
});

/**
 * Middleware: Check expiry status before updating
 * Ensures status is updated correctly during findOneAndUpdate operations
 */
medicineSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  
  if (update.expiryDate) {
    const currentDate = new Date();
    const expiryDate = new Date(update.expiryDate);
    
    currentDate.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    
    if (expiryDate < currentDate) {
      update.status = 'expired';
    } else {
      update.status = 'active';
    }
  }
  
  next();
});

/**
 * Static method: Update all expired medicines
 * Checks all medicines and updates their status based on expiry date
 */
medicineSchema.statics.updateExpiredMedicines = async function() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  try {
    const result = await this.updateMany(
      { 
        expiryDate: { $lt: currentDate },
        status: 'active'
      },
      { 
        $set: { status: 'expired' } 
      }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} expired medicines`);
    return result;
  } catch (error) {
    console.error('❌ Error updating expired medicines:', error);
    throw error;
  }
};

/**
 * Static method: Get analytics data
 * Calculates key metrics for dashboard
 */
medicineSchema.statics.getAnalytics = async function() {
  const currentDate = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(currentDate.getDate() + 30);
  
  try {
    // Total stock value (active medicines only)
    const stockValue = await this.aggregate([
      { $match: { status: 'active' } },
      { 
        $group: { 
          _id: null, 
          totalValue: { 
            $sum: { $multiply: ['$price', '$quantity'] } 
          } 
        } 
      }
    ]);
    
    // Soon to expire count (within 30 days)
    const soonToExpire = await this.countDocuments({
      status: 'active',
      expiryDate: { 
        $gte: currentDate, 
        $lte: thirtyDaysFromNow 
      }
    });
    
    // Expired count
    const expiredCount = await this.countDocuments({ status: 'expired' });
    
    // Total medicines count
    const totalMedicines = await this.countDocuments({});
    
    // Active medicines count
    const activeMedicines = await this.countDocuments({ status: 'active' });
    
    return {
      totalStockValue: stockValue.length > 0 ? stockValue[0].totalValue : 0,
      soonToExpire,
      expired: expiredCount,
      totalMedicines,
      activeMedicines
    };
  } catch (error) {
    console.error('❌ Error getting analytics:', error);
    throw error;
  }
};

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
