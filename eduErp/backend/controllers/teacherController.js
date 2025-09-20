import Teacher from '../models/teacherModel.js';

export const createTeacher = async (req, res) => {
  try {
    console.log('Create Teacher req.body:', req.body);
    const { userId, nic, subjects, section, joinDate, qualification, experience } = req.body;
    const teacher = new Teacher({
      userId,
      nic,
      subjects,
      section,
      joinDate,
      qualification,
      experience
    });
    await teacher.save();
    res.status(201).json({ success: true, teacher });
  } catch (error) {
    console.error('Error creating teacher:', error);
    // Handle duplicate NIC error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.nic) {
      return res.status(400).json({ success: false, message: 'NIC already exists. Please use a unique NIC.' });
    }
    res.status(500).json({ success: false, message: 'Failed to create teacher' });
  }
};