import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to users collection
      //required: true,
    },
    admissionNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      enum: ["Primary","Secondary","Art","Commerce","Maths","Science","Technology"],
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true, // automatically manages createdAt & updatedAt
  }
);

// Add indexes for faster lookups
studentSchema.index({ admissionNo: 1 }, { unique: true });
studentSchema.index({ grade: 1, section: 1 }, { unique: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
