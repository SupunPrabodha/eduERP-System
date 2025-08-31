# eduERP System with JWT Authentication

A comprehensive educational ERP system with JWT-based authentication, featuring role-based access control for students, teachers, and administrators.

## Features

- 🔐 **JWT Authentication**: Secure token-based authentication
- 👥 **Role-based Access Control**: Different interfaces for students, teachers, and admins
- 🔒 **Password Hashing**: Secure password storage using bcrypt
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Real-time Validation**: Form validation and error handling

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React.js** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling

## Project Structure

```
eduErp/
├── backend/
│   ├── config.js              # Configuration (database, JWT secret)
│   ├── index.js               # Main server file
│   ├── controllers/
│   │   └── loginController.js # Authentication logic
│   ├── models/
│   │   └── userModel.js       # User schema
│   ├── routes/
│   │   └── loginRoutes.js     # Authentication routes
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification middleware
│   └── scripts/
│       └── createTestUser.js  # Test user creation script
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── LoginPage.jsx  # Login form
    │   │   └── Dashboard.jsx  # User dashboard
    │   ├── services/
    │   │   └── authService.js # API service layer
    │   └── App.jsx            # Main app with routing
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database (local or cloud)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure database:**
   - Update `config.js` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure secret key

4. **Create test user (required for testing):**
   ```bash
   npm run create-test-user
   ```
   This creates a test user with:
   - Email: `test@example.com`
   - Password: `password123`
   - Role: `admin`

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5555`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Request/Response Examples

#### Login Request
```json
POST /api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "test@example.com",
      "name": "Test User",
      "role": "admin"
    },
    "token": "jwt_token_here"
  }
}
```

## User Roles

### Admin
- Full system access
- User management
- System settings
- Reports and analytics

### Teacher
- Class management
- Student grading
- Attendance tracking
- Course materials

### Student
- Course enrollment
- Grade viewing
- Schedule access
- Assignment submission

## Security Features

- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: bcrypt with 12 salt rounds
- **Token Expiration**: 24-hour token validity
- **CORS Protection**: Configured for cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error responses

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5555
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h
```

## Development

### Adding New Protected Routes

1. **Create middleware:**
   ```javascript
   import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
   
   // Route with authentication
   router.get('/protected', authenticateToken, yourController);
   
   // Route with role-based access
   router.get('/admin-only', authenticateToken, authorizeRole('admin'), adminController);
   ```

2. **Update frontend service:**
   ```javascript
   // Add new API call in authService.js
   export const yourApiCall = async () => {
     const response = await api.get('/your-endpoint');
     return response.data;
   };
   ```

### Adding New User Roles

1. **Update user model:**
   ```javascript
   role: {
     type: String,
     enum: ['admin', 'teacher', 'student', 'new_role'],
     default: 'student'
   }
   ```

2. **Update frontend components:**
   ```javascript
   {user?.role === 'new_role' && (
     // Role-specific content
   )}
   ```

## User Management

Since registration is disabled, users must be created through:
1. **Database scripts** (like the provided `createTestUser.js`)
2. **Direct database insertion**
3. **Admin panel** (future feature)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is properly configured
2. **JWT Token Expired**: Tokens expire after 24 hours, user needs to re-login
3. **Database Connection**: Check MongoDB connection string in config.js
4. **Port Conflicts**: Change PORT in config.js if 5555 is in use

### Debug Mode

Enable debug logging by adding to backend:
```javascript
console.log('Debug:', { user, token, error });
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
