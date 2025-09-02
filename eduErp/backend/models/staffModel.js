
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    employeeid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Vacation", "On Leave"],
      default: "Active", 
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      default: 0, 
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);


const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
