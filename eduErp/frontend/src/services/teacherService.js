import axios from 'axios';

const API_BASE_URL = 'http://localhost:5555/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const teacherService = {
  createTeacher: async (teacherData) => {
    try {
      const response = await api.post('/admin/teachers', teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create teacher' };
    }
  }
};

export default teacherService;