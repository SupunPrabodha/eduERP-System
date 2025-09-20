import mongoose from 'mongoose';

const DeductionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

const Deduction = mongoose.model('Deduction', DeductionSchema);
export default Deduction;