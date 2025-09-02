import nodemailer from 'nodemailer';
import { emailConfig, frontendUrl } from '../config/email.js';

// Create transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransporter(emailConfig);
};

// Send credentials email to new user
export const sendCredentialsEmail = async (email, userId, password, firstName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: emailConfig.auth.user,
      to: email,
      subject: 'Welcome to eduERP - Your Login Credentials',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to eduERP!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your account has been created successfully</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${firstName},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Welcome to the eduERP system! Your account has been created by an administrator. 
              Below are your login credentials:
            </p>
            
            <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Login Credentials:</h3>
              <div style="margin: 15px 0;">
                <strong style="color: #495057;">User ID:</strong>
                <span style="background: #f8f9fa; padding: 8px 12px; border-radius: 4px; font-family: monospace; margin-left: 10px;">
                  ${userId}
                </span>
              </div>
              <div style="margin: 15px 0;">
                <strong style="color: #495057;">Password:</strong>
                <span style="background: #f8f9fa; padding: 8px 12px; border-radius: 4px; font-family: monospace; margin-left: 10px;">
                  ${password}
                </span>
              </div>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h4 style="color: #856404; margin-top: 0;">⚠️ Important Security Notice:</h4>
              <ul style="color: #856404; margin: 10px 0; padding-left: 20px;">
                <li>Please change your password after your first login</li>
                <li>Keep your credentials secure and don't share them with anyone</li>
                <li>If you suspect any security issues, contact your administrator immediately</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${frontendUrl}/login" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Login to eduERP
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any questions or need assistance, please contact your system administrator.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated message from the eduERP system. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;

  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetToken, firstName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: emailConfig.auth.user,
      to: email,
      subject: 'eduERP - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Password Reset Request</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${firstName},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              You have requested to reset your password for your eduERP account. 
              Click the button below to reset your password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${frontendUrl}/reset-password?token=${resetToken}" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h4 style="color: #856404; margin-top: 0;">⚠️ Security Notice:</h4>
              <ul style="color: #856404; margin: 10px 0; padding-left: 20px;">
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>For security, this link can only be used once</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any questions or need assistance, please contact your system administrator.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              This is an automated message from the eduERP system. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', info.messageId);
    return true;

  } catch (error) {
    console.error('Password reset email sending failed:', error);
    throw error;
  }
};
