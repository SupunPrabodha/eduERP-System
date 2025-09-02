import express from 'express';
import { 
  createUser, 
  // getAllUsers, 
  // getUserById, 
  // updateUser, 
  // deleteUser, 
  getNextUserId 
} from '../controllers/adminController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeRole('ADMIN'));

// User management routes
router.post('/users', createUser);
// router.get('/users', getAllUsers);
// router.get('/users/:userId', getUserById);
// router.put('/users/:userId', updateUser);
// router.delete('/users/:userId', deleteUser);
router.get('/users/next-id/:role', getNextUserId);

export default router;
