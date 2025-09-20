import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { mongoDBURL } from '../config.js';

// Usage: node resetPassword.js <userId> <newPassword>
const [,, userId, newPassword] = process.argv;

if (!userId || !newPassword) {
  console.error('Usage: node resetPassword.js <userId> <newPassword>');
  process.exit(1);
}

const resetPassword = async () => {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('Connected to database');

    const user = await User.findOne({ userId });
    if (!user) {
      console.error('User not found:', userId);
      process.exit(1);
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    console.log(`Password for userId ${userId} has been reset successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
};

resetPassword();
