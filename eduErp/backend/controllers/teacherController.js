import Teacher from '../models/teacherModel.js';

export const createTeacher = async (req, res) => {
  try {
    const { userId, subjects, section, joinDate, qualification, experience } = req.body;
    const teacher = new Teacher({
      userId,
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
    res.status(500).json({ success: false, message: 'Failed to create teacher' });
  }
};