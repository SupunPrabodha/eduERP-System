import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ["ADMIN","TEACHER","STUDENT","PRINCIPLE","NON-ACADEMIC STAFF","ACADEMIC STAFF"],
    required: true
  },
  profile: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    dob: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ["Male","Female"]
    },
    address: {
      type: String,
      trim: true
    }
  },
  remarks: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  leaveBalance: {
    annual: {
      entitled: {
        type: Number,
        required: true,
        min: 0
      },
      used: {
        type: Number,
        default: 0,
        min: 0
      }
    },
    sick: {
      entitled: {
        type: Number,
        required: true,
        min: 0
      },
      used: {
        type: Number,
        default: 0,
        min: 0
      }
    },
    casual: {
      entitled: {
        type: Number,
        require: true,
        min: 0
      },
      used: {
        type: Number,
        default: 0,
        min: 0
      }
    },
    duty: {
      type: Number,
      default: 0,
      min: 0
    }
  }
}, {
  timestamps: true
});

// Create indexes for better performance
userSchema.index({ userId: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;
