export const getNextInventoryId = async (req, res) => {
  try {
    // Find the item with the highest itemId
    const lastItem = await Inventory.findOne({})
      .sort({ itemId: -1 })
      .collation({ locale: 'en_US', numericOrdering: true });

    let nextId = 'INV0001';
    if (lastItem && lastItem.itemId) {
      const match = lastItem.itemId.match(/INV(\d{4,})/);
      if (match) {
        const num = parseInt(match[1], 10) + 1;
        nextId = 'INV' + num.toString().padStart(4, '0');
      }
    }
    res.json({ nextItemId: nextId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate next item ID' });
  }
};
import Inventory from '../models/inventoryModel.js';

// Create a new inventory item
export const createInventoryItem = async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all inventory items
export const getAllInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
};

// Get inventory item by ID
export const getInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory item' });
  }
};

// Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const item = await Inventory.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

// Delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Inventory.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};
