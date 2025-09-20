import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['available', 'unavailable', 'maintenance', 'out-of-stock'],
    default: 'available'
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
