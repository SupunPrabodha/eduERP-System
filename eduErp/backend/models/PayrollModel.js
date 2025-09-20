import mongoose from 'mongoose';

const PayrollSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  overtime: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  status: { type: String, enum: ["pending", "approved", "paid"], default: "pending" }
}, { timestamps: true });

const Payroll = mongoose.model('Payroll', PayrollSchema);
export default Payroll;