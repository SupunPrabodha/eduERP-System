
import express from 'express';
import { createInventoryItem, getNextInventoryId, getAllInventoryItems } from '../controllers/inventoryController.js';

const router = express.Router();


// Route to get next inventory item ID
router.get('/next-id', getNextInventoryId);

// Route to add a new inventory item
router.post('/', createInventoryItem);

// Route to get all inventory items
router.get('/', getAllInventoryItems);

export default router;
