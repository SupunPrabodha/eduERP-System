import express from 'express';
import { createUser, getAllUsers, getNextUserId, getUserById, updateUser } from '../controllers/adminController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import { getNextStudentAdmissionNo, createStudent } from '../controllers/studentController.js';
import { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher} from '../controllers/teacherController.js';
import { getAllStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeRole('ADMIN'));

// User management routes
router.post('/users', createUser);
router.get('/users/:userId', getUserById);
router.put('/users/:userId', updateUser);

// Student CRUD routes
router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
router.get('/users/student/next-admission-no', getNextStudentAdmissionNo);

// Teacher CRUD routes
router.post('/teachers', createTeacher);
router.get('/teachers', getAllTeachers);
router.get('/teachers/:id', getTeacherById);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/next-id/:role', getNextUserId);

export default router;
