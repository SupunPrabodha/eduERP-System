const mongoose = require("mongoose");

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
    age: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
      enum: [
        "Sales",
        "Inventory",
        "Customer Support",
        "Operation Management",
      ], // Predefined department values
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
      enum: ["Active", "Vacation", "On Leave"], // Allowed status values
      default: "Active", // Default employee status
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      default: 0, // Admin assigns salary, employees cannot modify it
    },
    epf: {
      type: Number,
      required: true,
      default: 0, // Automatically calculated as 8% of salary
    },
    etf: {
      type: Number,
      required: true,
      default: 0, // Automatically calculated as 3% of salary
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
