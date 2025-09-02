const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        leaveType: {
            type: String,
            enum: ["sick", "casual", "annual"],
            required: true,
        },
        fromDate: { 
            type: Date, 
            required: true 
        },
        toDate: { 
            type: Date, 
            required: true 
        },
        reason: { 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
    }
);

module.exports = mongoose.model("Leave", leaveSchema);
