// Email Configuration
// To use email functionality, you need to:

// 1. Create a Gmail account or use existing one
// 2. Enable 2-factor authentication on your Gmail account
// 3. Generate an App Password:
//    - Go to Google Account settings
//    - Security > 2-Step Verification > App passwords
//    - Generate a new app password for "Mail"
// 4. Set environment variables:
//    EMAIL_USER=your-email@gmail.com
//    EMAIL_PASS=your-app-password

export const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
};

export const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
