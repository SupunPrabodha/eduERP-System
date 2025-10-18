import Student from "../models/studentModel.js";

const getNextStudentAdmissionNo = async (req, res) => {
    try {
        //find the student with the highest admission number
        const lastStudent = await Student.findOne({})
        .sort({ admissionNo: -1 })
        .select('admissionNo');

        let nextNumber = 1;
        if (lastStudent && lastStudent.admissionNo) {
            // Extract numeric part and increment
            const match = lastStudent.admissionNo.match(/AD(\d+)/);
            if (match) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        // Format next admission number
        const nextAdmissionNo = `AD${nextNumber.toString().padStart(5, '0')}`;
        res.json({ nextAdmissionNo });
    } catch (error) {
        console.error('Error fetching next admission number:', error);
        res.status(500).json({ message: 'Failed to generate admission number' });
    }
};
export { getNextStudentAdmissionNo };

const createStudent = async (req, res) => {
    try {
        const { userId, admissionNo, grade, section } = req.body;
        const student = new Student({
            userId,
            admissionNo,
            grade,
            section
        });
        await student.save();
        res.status(201).json({ success: true, student });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ success: false, message: 'Failed to create student' });
    }
};
export { createStudent };

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch students' });
    }
};
export { getAllStudents };

// Get student by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, student });
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch student' });
    }
};
export { getStudentById };

// Update student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const student = await Student.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, student });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ success: false, message: 'Failed to update student' });
    }
};
export { updateStudent };

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ success: false, message: 'Failed to delete student' });
    }
};
export { deleteStudent };