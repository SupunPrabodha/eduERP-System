import axios from 'axios';

const API_BASE_URL = 'http://localhost:5555/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
  const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication service
export const authService = {
  // Login user
  login: async (userId, password) => {
    try {
      const response = await api.post('/auth/login', { userId, password });
      if (response.data.success) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get profile' };
    }
  },

  // Check if user is authenticated and token is valid (JWT expiry)
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    // Check if token is JWT (contains two dots)
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          // Token expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return false;
        }
      } catch (e) {
        // Invalid token format, clear
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }
    }
    return true;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
  const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token from localStorage
  getToken: () => {
  return localStorage.getItem('token');
  },

  // Reset password
  resetPassword: async (userId, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { userId, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  },
};

export default authService;
export { api };
