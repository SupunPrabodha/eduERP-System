
import express from 'express';
import Payroll from '../models/PayrollModel.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();
// Approve payroll record
router.put('/:id/approve', authenticateToken, authorizeRole('ADMIN', 'PRINCIPLE'), async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }
    payroll.status = 'approved';
    await payroll.save();
    res.json({ success: true, message: 'Payroll approved', payroll });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve payroll', error: err.message });
  }
});

// Get single payroll record by ID
router.get('/:id', authenticateToken, authorizeRole('ADMIN', 'PRINCIPLE'), async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate('userId');
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payroll details', error: err.message });
  }
});

// Get payroll summary for all staff (admin/principal)
router.get('/reports/:month/:year', authenticateToken, authorizeRole('ADMIN', 'PRINCIPLE'), async (req, res) => {
  try {
    const { month, year } = req.params;
    // Populate userId to get user details in response
    const payrolls = await Payroll.find({ month: Number(month), year: Number(year) })
      .populate('userId');
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payrolls', error: err.message });
  }
});

// ...other payroll routes (calculate, approve, pay, etc.)

export default router;
