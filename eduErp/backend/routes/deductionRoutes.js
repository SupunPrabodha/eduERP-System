import express from 'express';
import Deduction from '../models/DeductionModel.js';
import Payroll from '../models/PayrollModel.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new deduction
router.post('/', authenticateToken, authorizeRole('ADMIN', 'PRINCIPLE'), async (req, res) => {
  try {
    const { userId, type, amount, reason, month, year } = req.body;
  const deduction = new Deduction({ userId, type, amount, reason, month, year });
    await deduction.save();

    // Recalculate total deductions for user/month/year
    if (userId && month && year) {
      // Find all deductions for this user/month/year
      // Assumes DeductionModel has month/year fields; if not, you must add them
      const allDeductions = await Deduction.find({ userId, month, year });
      const totalDeduction = allDeductions.reduce((sum, d) => sum + (d.amount || 0), 0);
      // Update PayrollModel for this user/month/year
      await Payroll.findOneAndUpdate(
        { userId, month, year },
        { $set: { deductions: totalDeduction } }
      );
    }

    res.status(201).json(deduction);
  } catch (err) {
    console.error('Deduction save error:', err);
    res.status(500).json({ message: 'Failed to save deduction', error: err.message, stack: err.stack });
  }
});

// Optionally: Get all deductions for a user
router.get('/user/:userId', authenticateToken, authorizeRole('ADMIN', 'PRINCIPLE'), async (req, res) => {
  try {
    const deductions = await Deduction.find({ userId: req.params.userId });
    res.json(deductions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deductions', error: err.message });
  }
});

export default router;
