import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        leaveType: {
            type: String,
            enum: ["Medical Leave", "Casual Leave", "Maternity Leave", "Other"],
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
        status: { 
            type: String, 
            default: "Pending",
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
    }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
