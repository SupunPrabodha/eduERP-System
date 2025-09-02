import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { mongoDBURL } from '../config.js';

const createTestUser = async () => {
  try {
    // Connect to database
    await mongoose.connect(mongoDBURL);
    console.log('Connected to database');

    // Check if test user already exists
    const existingUser = await User.findOne({ userId: 'ADMIN001' });
    if (existingUser) {
      console.log('Test user already exists');
      process.exit(0);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('password123', saltRounds);

    // Create test user
    const testUser = new User({
      userId: 'ADMIN001',
      email: 'admin@eduERP.com',
      password: hashedPassword,
      phone: '+1234567890',
      role: 'ADMIN',
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        dob: new Date('1990-01-01'),
        gender: 'Male',
        address: '123 Admin Street, City, Country'
      },
      remarks: 'Test admin user',
      isActive: true
    });

    await testUser.save();
    console.log('Test user created successfully');
    console.log('User ID: ADMIN001');
    console.log('Password: password123');
    console.log('Role: ADMIN');
    console.log('Email: admin@eduERP.com');

    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
