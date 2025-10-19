import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
	complaintId: {
		type: String,
		required: true,
		unique: true
	},
	reason: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	picture: {
		type: String // store file path or URL
	},
	userId: {
		type: String,
		required: true
	},
       name: {
	       type: String,
	       required: true
       },
	role: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
