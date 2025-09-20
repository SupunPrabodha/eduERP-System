import nodemailer from 'nodemailer';
import { emailConfig, frontendUrl } from '../config/email.js';

// Create transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};

// Send credentials email to new user
export const sendCredentialsEmail = async (email, userId, password, firstName) => {
  // MOCK: Do not send real email, just log to console
  console.log('[MOCK EMAIL] sendCredentialsEmail called with:', { email, userId, password, firstName });
  return true;
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken, firstName) => {
  // MOCK: Do not send real email, just log to console
  console.log('[MOCK EMAIL] sendPasswordResetEmail called with:', { email, resetToken, firstName });
  return true;
};
