import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { medicineAPI } from '../services/api';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const MedicineCard = ({ medicine, index, handleEdit, handleDelete }) => {
  const isExpired = medicine.status === 'expired';
  const isSoonToExpire = !isExpired && new Date(medicine.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
      transition={{ 
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        rotateY: 5,
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`glass-card p-6 relative overflow-hidden ${
        isExpired ? 'border-red-500/50' : isSoonToExpire ? 'border-yellow-500/50' : 'border-green-500/50'
      } border-2 cursor-pointer`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Animated gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Status badge with pulse effect */}
      <motion.div 
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          isExpired ? 'bg-red-500/20 text-red-400' : 
          isSoonToExpire ? 'bg-yellow-500/20 text-yellow-400' : 
          'bg-green-500/20 text-green-400'
        } backdrop-blur-sm`}
        animate={isExpired || isSoonToExpire ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isExpired ? '❌ Expired' : isSoonToExpire ? '⚠️ Soon' : '✓ Active'}
      </motion.div>

      <div className="mb-4 relative z-10">
        <motion.h3 
          className="text-xl font-bold mb-2 gradient-text"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 + 0.1 }}
        >
          {medicine.name}
        </motion.h3>
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 + 0.15 }}
        >
          {medicine.category}
        </motion.p>
      </div>

      <motion.div 
        className="space-y-2 mb-4 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.05 + 0.2 }}
      >
        <div className="flex justify-between">
          <span className="text-gray-400">Quantity:</span>
          <motion.span 
            className="font-semibold"
            whileHover={{ scale: 1.1, color: '#60a5fa' }}
          >
            {medicine.quantity}
          </motion.span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Price:</span>
          <motion.span 
            className="font-semibold text-green-400"
            whileHover={{ scale: 1.1 }}
          >
            ${medicine.price}
          </motion.span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Expiry:</span>
          <span className={`font-semibold ${
            isExpired ? 'text-red-400' : isSoonToExpire ? 'text-yellow-400' : 'text-gray-300'
          }`}>
            {new Date(medicine.expiryDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Value:</span>
          <motion.span 
            className="font-semibold text-blue-400"
            whileHover={{ scale: 1.1 }}
          >
            ${(medicine.price * medicine.quantity).toFixed(2)}
          </motion.span>
        </div>
      </motion.div>

      {/* Action buttons with slide-in effect */}
      <motion.div 
        className="flex gap-2 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleEdit(medicine)}
          className="flex-1 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaEdit /> Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(medicine._id)}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaTrash />
        </motion.button>
      </motion.div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '200%' : '-100%' }}
        transition={{ duration: 0.6 }}
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
};

/**
 * Inventory Dashboard Component
 * CRUD operations with animated cards
 */
const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0 });

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    expiryDate: '',
    price: '',
  });

  useEffect(() => {
    fetchMedicines();
  }, [searchTerm, filterStatus, pagination.page]);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await medicineAPI.getAll({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        status: filterStatus,
      });
      setMedicines(response.data.data);
      setPagination(prev => ({ ...prev, total: response.data.pagination.total }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMedicine) {
        await medicineAPI.update(editingMedicine._id, formData);
      } else {
        await medicineAPI.create(formData);
      }
      setShowModal(false);
      setEditingMedicine(null);
      resetForm();
      fetchMedicines();
    } catch (error) {
      console.error('Error saving medicine:', error);
      alert('Error saving medicine. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await medicineAPI.delete(id);
        fetchMedicines();
      } catch (error) {
        console.error('Error deleting medicine:', error);
        alert('Error deleting medicine. Please try again.');
      }
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      category: medicine.category,
      quantity: medicine.quantity,
      expiryDate: medicine.expiryDate.split('T')[0],
      price: medicine.price,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      quantity: '',
      expiryDate: '',
      price: '',
    });
  };

  return (
    <section id="inventory" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">
            Medicine Inventory
          </h2>
          <p className="text-gray-400 text-lg">
            Manage your pharmacy stock with ease
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field pl-12 pr-8"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingMedicine(null);
                resetForm();
                setShowModal(true);
              }}
              className="btn-primary flex items-center gap-2"
            >
              <FaPlus /> Add Medicine
            </motion.button>
          </div>
        </div>

        {/* Medicine Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No medicines found</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {medicines.map((medicine, index) => (
                <MedicineCard key={medicine._id} medicine={medicine} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {pagination.total > pagination.limit && (
          <div className="flex justify-center mt-12 gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
            <span className="px-4 py-2 glass-card">
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
              className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass-card p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold gradient-text mb-6">
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Medicine name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Pain Relief, Antibiotic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="input-field"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    {editingMedicine ? 'Update' : 'Add'} Medicine
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingMedicine(null);
                      resetForm();
                    }}
                    className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Inventory;
