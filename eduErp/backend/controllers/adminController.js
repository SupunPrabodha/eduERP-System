// Delete user by userId
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findOneAndDelete({ userId });
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { sendCredentialsEmail } from '../services/emailService.js';

// Update user by userId
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const user = await User.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get user by userId
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Generate next user ID based on role
const generateNextUserId = async (role) => {
  const rolePrefix = getRolePrefix(role);
  const lastUser = await User.findOne({ 
    userId: { $regex: `^${rolePrefix}` } 
  }).sort({ userId: -1 });
  
  let nextNumber = 20534; // Starting number
  if (lastUser) {
    const lastNumber = parseInt(lastUser.userId.replace(rolePrefix, ''));
    nextNumber = lastNumber + 1;
  }
  
  return `${rolePrefix}${nextNumber.toString().padStart(5, '0')}`;
};

// Get role prefix for user ID generation
const getRolePrefix = (role) => {
  switch (role) {
    case 'ADMIN':
      return 'A';
    case 'TEACHER':
      return 'T';
    case 'STUDENT':
      return 'S';
    case 'PRINCIPLE':
      return 'P';
    case 'NON-ACADEMIC STAFF':
      return 'NAS';
    case 'ACADEMIC STAFF':
      return 'AS';
    default:
      return 'U';
  }
};

// Generate random password
const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const {
      email,
      phone,
      role,
      profile,
      remarks
    } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Generate user ID and password
    const userId = await generateNextUserId(role);
    const password = generatePassword();

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      userId,
      email,
      password: hashedPassword,
      phone,
      role,
      profile,
      remarks,
      isActive: true
    });

    await newUser.save();

    // Send credentials email
    try {
      await sendCredentialsEmail(email, userId, password, profile.firstName);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: {
          id: newUser._id,
          userId: newUser.userId,
          email: newUser.email,
          name: `${newUser.profile.firstName} ${newUser.profile.lastName}`,
          role: newUser.role
        },
        password 
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find().select('-password');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "Users not found" });
  }

  return res.status(200).json({ users });
};

// Get next user ID for a role
export const getNextUserId = async (req, res) => {
  try {
    const { role } = req.params;
    const nextUserId = await generateNextUserId(role);

    res.status(200).json({
      success: true,
      data: { nextUserId }
    });

  } catch (error) {
    console.error('Get next user ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
