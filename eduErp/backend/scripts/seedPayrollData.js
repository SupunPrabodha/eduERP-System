import mongoose from 'mongoose';
import Allowance from '../models/AllowanceModel.js';
import Deduction from '../models/DeductionModel.js';
import Payroll from '../models/PayrollModel.js';
import User from '../models/userModel.js';
import { mongoDBURL } from '../config.js';

async function seedPayrollData() {
  await mongoose.connect(mongoDBURL);

  // Find users with relevant roles
  const roles = ['TEACHER', 'PRINCIPLE', 'ADMMIN', 'ACADEMIC STAFF', 'NON-ACADEMIC STAFF'];
  const users = await User.find({ role: { $in: roles } });

  for (const user of users) {
    // Insert Allowances
    await Allowance.create([
      { userId: user._id, type: 'Transport', amount: 5000 },
      { userId: user._id, type: 'Medical', amount: 2000 }
    ]);

    // Insert Deductions
    await Deduction.create([
      { userId: user._id, type: 'Tax', amount: 1500 },
      { userId: user._id, type: 'Loan', amount: 1000 }
    ]);

    // Insert Payroll for current month/year
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    await Payroll.create({
      userId: user._id,
      month,
      year,
      basicSalary: user.basicSalary || 40000,
      allowances: 7000,
      deductions: 2500,
      overtime: 1000,
      netSalary: (user.basicSalary || 40000) + 7000 + 1000 - 2500,
      status: 'pending'
    });
  }

  console.log('Sample payroll data inserted.');
  mongoose.disconnect();
}

seedPayrollData().catch(err => {
  console.error(err);
  mongoose.disconnect();
});