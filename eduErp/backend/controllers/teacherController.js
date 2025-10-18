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

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ success: true, teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch teachers' });
  }
};

// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.status(200).json({ success: true, teacher });
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch teacher' });
  }
};

// Update teacher
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.status(200).json({ success: true, teacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    // Handle duplicate NIC error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.nic) {
      return res.status(400).json({ success: false, message: 'NIC already exists. Please use a unique NIC.' });
    }
    res.status(500).json({ success: false, message: 'Failed to update teacher' });
  }
};

// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ success: false, message: 'Failed to delete teacher' });
  }
};