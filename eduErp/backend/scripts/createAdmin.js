import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { mongoDBURL } from '../config.js';

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(mongoDBURL);
    console.log('Connected to database');

    // Check if test user already exists
    const existingUser = await User.findOne({ userId: 'A20100' });
    if (existingUser) {
      console.log('Test user already exists');
      process.exit(0);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('password123', saltRounds);

    // Create admin 
    const admin = new User({
      userId: 'A20100',
      email: 'admin.edu@gmail.com',
      password: hashedPassword,
      phone: 'N/A',
      role: 'ADMIN',
      profile: {
        firstName: 'N/A',
        lastName: 'N/A',
        dob: '2000-05-15',
        gender: 'Male',
        address: 'N/A',
      },
      remarks: 'N/A',
      isActive: true
    });

    await admin.save();
    console.log('admin created successfully');
    console.log('Email: admin.edu@gmail.com');
    console.log('Role: ADMIN');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
