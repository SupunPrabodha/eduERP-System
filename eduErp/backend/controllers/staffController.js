
const Staff = require("../models/staffModel.js");

// Display All Staff Members
const getAllStaff = async (req, res, next) => {
    let staffM;
    try {
        staffM = await Staff.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!staffM || staffM.length === 0) {
        return res.status(404).json({ message: "Staff Members Not found" });
    }
    return res.status(200).json({ staffM });
};

// Add Staff Member
const addStaff = async (req, res) => {
    try {
        const { employeeid, name, age, department, email, mobile, status, address, salary } = req.body;

        const staff = new Staff({
            employeeid,
            name,
            age,
            department,
            email,
            mobile,
            status,
            address,
            salary
        });

        await staff.save();
        return res.status(201).json({ staff });
    } catch (err) {
        console.error("Error adding staff member:", err);
        return res.status(500).json({ message: "Error adding staff member", error: err.message });
    }
};

module.exports = { getAllStaff, addStaff };