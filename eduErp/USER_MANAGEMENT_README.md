# User Management System - eduERP

This document describes the comprehensive user management system implemented for the eduERP application.

## 🚀 Features

### Admin User Management
- ✅ **Create New Users**: Admin can create users with any role type
- ✅ **Auto-generated User IDs**: Based on role with specific format
- ✅ **Auto-generated Passwords**: Secure 8-character passwords
- ✅ **Email Notifications**: Credentials sent to new users via email
- ✅ **Role-based Access**: Different user types with specific permissions
- ✅ **Form Validation**: Comprehensive input validation
- ✅ **Real-time Preview**: Shows next user ID before creation

### User ID Generation Format
- **ADMIN**: `A20534`, `A20535`, etc.
- **TEACHER**: `T20534`, `T20535`, etc.
- **STUDENT**: `S20534`, `S20535`, etc.
- **PRINCIPLE**: `P20534`, `P20535`, etc.
- **NON-ACADEMIC STAFF**: `NAS20534`, `NAS20535`, etc.
- **ACADEMIC STAFF**: `AS20534`, `AS20535`, etc.

## 📋 User Model Fields

### Required Fields
- `userId` (auto-generated)
- `email` (unique)
- `password` (auto-generated, min 6 chars)
- `role` (enum: ADMIN, TEACHER, STUDENT, PRINCIPLE, NON-ACADEMIC STAFF, ACADEMIC STAFF)
- `profile.firstName`
- `profile.lastName`
- `profile.dob` (date of birth)

### Optional Fields
- `phone`
- `profile.gender` (Male/Female)
- `profile.address`
- `remarks`
- `isActive` (default: true)

## 🔧 Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install nodemailer
```

#### Email Configuration
1. **Create Gmail Account** (or use existing)
2. **Enable 2-Factor Authentication**
3. **Generate App Password**:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate new app password for "Mail"
4. **Set Environment Variables**:
   ```bash
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   FRONTEND_URL=http://localhost:5173
   ```

#### Start Backend Server
```bash
npm run dev
```

### 2. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Server
```bash
npm run dev
```

## 🎯 How to Use

### 1. Admin Login
- Login with admin credentials
- User ID: `ADMIN001`
- Password: `password123`

### 2. Create New User
1. **Click "Create New User"** button in admin dashboard
2. **Fill Required Fields**:
   - Select role from dropdown
   - Enter email address
   - Enter first name
   - Enter last name
   - Select date of birth
3. **Fill Optional Fields** (if needed):
   - Phone number
   - Gender
   - Address
   - Remarks
4. **Submit Form**
5. **View Generated Credentials**:
   - User ID will be displayed
   - Password will be shown
   - Email will be sent to user

### 3. Email Notification
- New users receive welcome email with:
  - Generated User ID
  - Generated Password
  - Login instructions
  - Security notices

## 🔒 Security Features

### Password Generation
- 8-character random passwords
- Includes uppercase, lowercase, numbers, and symbols
- Stored as bcrypt hash (12 salt rounds)

### User ID Generation
- Role-based prefixes
- Sequential numbering starting from 20534
- Unique across all users

### Email Security
- Gmail SMTP with app passwords
- HTML email templates
- Security notices included

## 📁 File Structure

```
backend/
├── controllers/
│   ├── loginController.js      # Authentication logic
│   └── adminController.js      # User management logic
├── routes/
│   ├── loginRoutes.js          # Auth routes
│   └── adminRoutes.js          # Admin routes
├── middleware/
│   └── authMiddleware.js       # JWT & role verification
├── services/
│   └── emailService.js         # Email functionality
├── models/
│   └── userModel.js            # User schema
└── config/
    └── email.js                # Email configuration

frontend/
├── pages/
│   ├── LoginPage.jsx           # Login form
│   └── AdminDashboard.jsx      # Admin dashboard
├── components/
│   └── CreateUserForm.jsx      # User creation form
└── services/
    ├── authService.js          # Authentication API
    └── userService.js          # User management API
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Admin User Management
- `POST /api/admin/users` - Create new user
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:userId` - Get specific user
- `PUT /api/admin/users/:userId` - Update user
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/users/next-id/:role` - Get next user ID

## 🎨 UI Components

### CreateUserForm
- **Modal Form**: Overlay form for user creation
- **Real-time Validation**: Form validation with error messages
- **Role Selection**: Dropdown with all available roles
- **Next ID Preview**: Shows generated user ID before creation
- **Success Feedback**: Shows generated credentials after creation

### AdminDashboard
- **Role-based Access**: Only admin users can access
- **Create User Button**: Prominent button to open user creation form
- **User Information**: Displays current admin user details
- **Quick Actions**: Various admin functions

## 📧 Email Templates

### Welcome Email
- Professional HTML template
- User credentials display
- Security notices
- Login link
- Branded styling

### Password Reset Email
- Secure reset link
- Expiration notice
- Security warnings

## 🛠️ Troubleshooting

### Email Issues
1. **Check Gmail Settings**:
   - 2FA enabled
   - App password generated
   - Less secure apps disabled
2. **Verify Environment Variables**:
   - EMAIL_USER set correctly
   - EMAIL_PASS is app password (not regular password)
3. **Check Console Logs**:
   - Email sending errors logged
   - SMTP connection issues

### User Creation Issues
1. **Database Connection**: Ensure MongoDB is connected
2. **Validation Errors**: Check required fields
3. **Duplicate Email**: Email must be unique
4. **Role Validation**: Role must be from enum list

### Frontend Issues
1. **CORS Errors**: Check backend CORS configuration
2. **Authentication**: Ensure JWT token is valid
3. **Role Access**: Verify user has ADMIN role

## 🔄 Future Enhancements

### Planned Features
- [ ] User list view with pagination
- [ ] User search and filtering
- [ ] Bulk user import (CSV/Excel)
- [ ] User profile editing
- [ ] Password reset functionality
- [ ] User activity logs
- [ ] Email templates customization
- [ ] User deactivation/reactivation

### Technical Improvements
- [ ] Email queue system
- [ ] Password strength requirements
- [ ] User ID format customization
- [ ] Audit trail logging
- [ ] API rate limiting
- [ ] Enhanced error handling

## 📞 Support

For issues or questions:
1. Check console logs for errors
2. Verify all environment variables
3. Test email configuration
4. Review API documentation
5. Check database connectivity

## 📄 License

This user management system is part of the eduERP project and follows the same licensing terms.
