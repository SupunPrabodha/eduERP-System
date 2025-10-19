import express from 'express';
import { createComplaint, deleteComplaint } from '../controllers/complaint.js';
import Complaint from '../models/complaintsModel.js';
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


// GET /api/complaints - fetch all complaints
router.get('/', async (req, res) => {
       try {
	       const complaints = await Complaint.find().sort({ createdAt: -1 });
	       res.json(complaints);
       } catch (error) {
	       res.status(500).json({ message: 'Error fetching complaints', error });
       }
});

// GET /api/complaints/:complaintId - fetch one complaint
router.get('/:complaintId', async (req, res) => {
       try {
	       const complaint = await Complaint.findOne({ complaintId: req.params.complaintId });
	       if (!complaint) {
		       return res.status(404).json({ message: 'Complaint not found' });
	       }
	       res.json(complaint);
       } catch (error) {
	       res.status(500).json({ message: 'Error fetching complaint', error });
       }
});

// DELETE /api/complaints/:complaintId - delete a complaint
router.delete('/:complaintId', deleteComplaint);

// POST /api/complaints - create complaint
router.post('/', upload.single('picture'), createComplaint);

export default router;
