import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { sendCredentialsEmail } from '../services/emailService.js';

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
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
    
//     res.status(200).json({
//       success: true,
//       data: { users }
//     });

//   } catch (error) {
//     console.error('Get all users error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// Get user by ID
// export const getUserById = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId).select('-password');
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: { user }
//     });

//   } catch (error) {
//     console.error('Get user by ID error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// Update user
// export const updateUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const updateData = req.body;

//     // Remove sensitive fields from update
//     delete updateData.password;
//     delete updateData.userId;

//     const user = await User.findByIdAndUpdate(
//       userId,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully',
//       data: { user }
//     });

//   } catch (error) {
//     console.error('Update user error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// Delete user
// export const deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findByIdAndDelete(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'User deleted successfully'
//     });

//   } catch (error) {
//     console.error('Delete user error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

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
