import express from 'express';
import { login, getProfile, logout } from '../controllers/loginController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

export default router;
