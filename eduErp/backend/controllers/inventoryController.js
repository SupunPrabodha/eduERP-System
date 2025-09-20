// Get next available inventory item ID
export const getNextInventoryId = async (req, res) => {
  try {
    // Find the item with the highest itemId (assuming itemId is like INV0001, INV0002, ...)
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
