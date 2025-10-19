
import express from 'express';
import {
	createInventoryItem,
	getNextInventoryId,
	getAllInventoryItems,
	getInventoryItemById,
	updateInventoryItem,
	deleteInventoryItem,
	addStockToInventoryItem
} from '../controllers/inventoryController.js';

const router = express.Router();


// Route to get next inventory item ID
router.get('/next-id', getNextInventoryId);

// Route to add a new inventory item
router.post('/', createInventoryItem);

// Route to get all inventory items
router.get('/', getAllInventoryItems);

// Route to get inventory item by ID
router.get('/:id', getInventoryItemById);

// Route to update inventory item
router.put('/:id', updateInventoryItem);

// Route to add stock to inventory item
router.put('/:id/add-stock', addStockToInventoryItem);

// Route to delete inventory item
router.delete('/:id', deleteInventoryItem);

export default router;
