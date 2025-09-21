import mongoose from 'mongoose';

const DeductionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  reason: { type: String, trim: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true }
}, { timestamps: true });

const Deduction = mongoose.model('Deduction', DeductionSchema);
export default Deduction;