const Staff = require("../models/staffModel"); 

//Display All Staff Members
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