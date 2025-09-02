// leaveRoutes.js
// Express routes for Leave
import express from 'express';
import * as leaveController from '../controllers/leaveController.js';

const router = express.Router();

router.post('/', leaveController.createLeave);
router.get('/', leaveController.getLeaves);
router.get('/:id', leaveController.getLeaveById);
router.put('/:id', leaveController.updateLeave);
router.delete('/:id', leaveController.deleteLeave);

export default router;
