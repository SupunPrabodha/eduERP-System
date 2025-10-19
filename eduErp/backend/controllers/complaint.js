import Complaint from '../models/complaintsModel.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new complaint
export const createComplaint = async (req, res) => {
       try {
	       const { reason, description, userId, name, role } = req.body;
	       let picture = null;
	       if (req.file) {
		       picture = req.file.path;
	       }
	       const complaint = new Complaint({
		       complaintId: uuidv4(),
		       reason,
		       description,
		       picture,
		       userId,
		       name,
		       role
	       });
	       await complaint.save();
	       res.status(201).json({ message: 'Complaint created successfully', complaint });
       } catch (error) {
	       res.status(500).json({ message: 'Error creating complaint', error });
       }
};
