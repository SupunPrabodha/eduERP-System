import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true
    },
    subjects: [
      {
        type: String,
        trim: true,
      },
    ],
    section: {
      type: String,
      enum: ["Primary","Secondary","Advance level"],
      trim: true,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    qualification: {
      type: String, 
      trim: true,
    },
    experience: {
      type: Number, 
      default: 0,
    },
    // leaveBalance: {
    //   annual: { entitled: { type: Number, required: true, default: 21 }, used: { type: Number, default: 0 } },
    //   sick: { entitled: { type: Number, required: true, default: 10 }, used: { type: Number, default: 0 } },
    //   casual: { entitled: { type: Number, required: true, default: 7 }, used: { type: Number, default: 0 } },
    //   duty: { entitled: { type: Number, required: true, default: 5 }, used: { type: Number, default: 0 } },
    // },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
