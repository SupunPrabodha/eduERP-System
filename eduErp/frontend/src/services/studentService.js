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
  (error) => Promise.reject(error)
);

//get next admission number
export const studentService = {
  // Safely fetch all students for analysis
  getAllStudents: async () => {
    try {
      const response = await api.get('/admin/students');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch students' };
    }
  },
    getNextAdmissionNo: async () => {
    try {
        const response = await api.get('/admin/users/student/next-admission-no');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get next admission number' };
    }
    },

    createStudent: async (studentData) => {
        try {
            const response = await api.post('/admin/students', studentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create student' };
        }
    }
};

export default studentService;