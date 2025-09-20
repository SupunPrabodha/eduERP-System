import mongoose from 'mongoose';

const AllowanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

const Allowance = mongoose.model('Allowance', AllowanceSchema);
export default Allowance;