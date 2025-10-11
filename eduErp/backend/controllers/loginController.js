// Reset password for a user by userId
export const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    if (!userId || !newPassword) {
      return res.status(400).json({ success: false, message: 'User ID and new password are required' });
    }
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config.js';

// Login user
export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Validate input
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'User ID and password are required'
      });
    }

    // Find user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid User ID or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid User ID or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        userLoginId: user.userId,
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          userId: user.userId,
          email: user.email,
          name: `${user.profile.firstName} ${user.profile.lastName}`,
          role: user.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get current user profile
import Teacher from '../models/teacherModel.js';
import Student from '../models/studentModel.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let extraDetails = null;
    if (user.role === 'TEACHER') {
      extraDetails = await Teacher.findOne({ userId: user._id });
    } else if (user.role === 'STUDENT') {
      extraDetails = await Student.findOne({ userId: user._id });
    }

    res.status(200).json({
      success: true,
      data: {
        user,
        details: extraDetails
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Logout (client-side token removal)
export const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
