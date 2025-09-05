import express from 'express';
import { 
  createUser, 
  getAllUsers,
  getNextUserId 
} from '../controllers/adminController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import { getNextStudentAdmissionNo, createStudent } from '../controllers/studentController.js';
import { createTeacher } from '../controllers/teacherController.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeRole('ADMIN'));

// User management routes
router.post('/users', createUser);
router.post('/students', createStudent)
router.post('/teachers', createTeacher);
router.get('/users', getAllUsers);
router.get('/users/next-id/:role', getNextUserId);

router.get('/users/student/next-admission-no', getNextStudentAdmissionNo);

export default router;
