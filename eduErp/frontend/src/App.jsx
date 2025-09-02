import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import authService from './services/authService.js'
import AddStaff from './pages/AddStaff'
import DisplayStaff from './pages/DisplayStaff'
import UpdateStaff from './pages/UpdateStaff'
import LeaveForm from './pages/LeaveForm'
import LeaveList from './pages/LeaveList'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Admin Route component
const AdminRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  
  if (isAuthenticated) {
    if (currentUser?.role === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />} />
      <Route path='/staff/all' element={<DisplayStaff />} />
      <Route path='/staff/add' element={<AddStaff />} />
      <Route path='/staff/update/:id' element={<UpdateStaff />} />
      <Route path='/leaves' element={<LeaveList />} />
      <Route path='/leaves/apply' element={<LeaveForm />} />
      <Route path='/login' element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path='/admin' element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h1>
              <p className="text-gray-600">Dashboard for non-admin users coming soon...</p>
            </div>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App