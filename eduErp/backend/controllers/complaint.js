
// Delete a complaint by complaintId
export const deleteComplaint = async (req, res) => {
	try {
		const deleted = await Complaint.findOneAndDelete({ complaintId: req.params.complaintId });
		if (!deleted) {
			return res.status(404).json({ message: 'Complaint not found' });
		}
		res.json({ message: 'Complaint deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting complaint', error });
	}
};
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
