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