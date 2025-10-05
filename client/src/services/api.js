import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Medicine API calls
export const medicineAPI = {
  // Get all medicines with pagination and filters
  getAll: (params = {}) => api.get('/medicines', { params }),
  
  // Get single medicine by ID
  getById: (id) => api.get(`/medicines/${id}`),
  
  // Create new medicine
  create: (data) => api.post('/medicines', data),
  
  // Update medicine
  update: (id, data) => api.put(`/medicines/${id}`, data),
  
  // Delete medicine
  delete: (id) => api.delete(`/medicines/${id}`),
  
  // Get analytics
  getAnalytics: () => api.get('/medicines/analytics'),
  
  // Manually trigger expiry check
  checkExpiry: () => api.post('/medicines/check-expiry'),
};

export default api;
