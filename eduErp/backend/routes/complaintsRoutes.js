import express from 'express';
import { createComplaint } from '../controllers/complaint.js';
import multer from 'multer';
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage: storage });

// POST /api/complaints - create complaint
router.post('/', upload.single('picture'), createComplaint);

export default router;
