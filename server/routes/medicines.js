import express from 'express';
import Medicine from '../models/Medicine.js';

const router = express.Router();

/**
 * @route   GET /api/medicines
 * @desc    Get all medicines with pagination, search, and filter
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      category = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query object
    const query = {};
    
    // Search by name or category
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const medicines = await Medicine.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await Medicine.countDocuments(query);

    res.json({
      success: true,
      data: medicines,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching medicines', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/medicines/analytics
 * @desc    Get analytics data
 * @access  Public
 */
router.get('/analytics', async (req, res) => {
  try {
    const analytics = await Medicine.getAnalytics();
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching analytics', 
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/medicines/:id
 * @desc    Get single medicine by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    
    if (!medicine) {
      return res.status(404).json({ 
        success: false, 
        message: 'Medicine not found' 
      });
    }
    
    res.json({
      success: true,
      data: medicine
    });
  } catch (error) {
    console.error('Error fetching medicine:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching medicine', 
      error: error.message 
    });
  }
});

/**
 * @route   POST /api/medicines
 * @desc    Create new medicine
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { name, category, quantity, expiryDate, price } = req.body;

    // Validate required fields
    if (!name || !category || quantity === undefined || !expiryDate || price === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Create new medicine
    const medicine = new Medicine({
      name,
      category,
      quantity,
      expiryDate,
      price
    });

    // Save to database (pre-save middleware will check expiry)
    await medicine.save();

    res.status(201).json({
      success: true,
      message: 'Medicine created successfully',
      data: medicine
    });
  } catch (error) {
    console.error('Error creating medicine:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating medicine', 
      error: error.message 
    });
  }
});

/**
 * @route   PUT /api/medicines/:id
 * @desc    Update medicine
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, category, quantity, expiryDate, price } = req.body;

    // Build update object
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (expiryDate !== undefined) updateData.expiryDate = expiryDate;
    if (price !== undefined) updateData.price = price;

    // Update medicine (pre-update middleware will check expiry)
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!medicine) {
      return res.status(404).json({ 
        success: false, 
        message: 'Medicine not found' 
      });
    }

    res.json({
      success: true,
      message: 'Medicine updated successfully',
      data: medicine
    });
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating medicine', 
      error: error.message 
    });
  }
});

/**
 * @route   DELETE /api/medicines/:id
 * @desc    Delete medicine
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({ 
        success: false, 
        message: 'Medicine not found' 
      });
    }

    res.json({
      success: true,
      message: 'Medicine deleted successfully',
      data: medicine
    });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting medicine', 
      error: error.message 
    });
  }
});

/**
 * @route   POST /api/medicines/check-expiry
 * @desc    Manually trigger expiry check (for testing)
 * @access  Public
 */
router.post('/check-expiry', async (req, res) => {
  try {
    const result = await Medicine.updateExpiredMedicines();
    
    res.json({
      success: true,
      message: 'Expiry check completed',
      data: {
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    console.error('Error checking expiry:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error checking expiry', 
      error: error.message 
    });
  }
});

export default router;
