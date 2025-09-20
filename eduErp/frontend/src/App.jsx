import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import GetAllUser from './pages/GetAllUser'
import AddInventory from './pages/AddInventory'
import GetAllInventory from './pages/GetAllInventory'
import authService from './services/authService.js'
import UserProfilePage from './pages/UserProfilePage'
import LeaveForm from './pages/LeaveForm'
import LeaveList from './pages/LeaveList'
import ManageLeave from './pages/ManageLeave';


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

// Public Route component (redirects to correct dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  
  if (isAuthenticated) {
    if (currentUser?.role === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    } else if (currentUser?.role === 'TEACHER') {
      return <Navigate to="/teacher-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/leaves' element={<LeaveList />} />
      <Route path='/leaves/apply' element={<LeaveForm />} />
      <Route path='/manage-leave/:id' element={<ManageLeave />} />
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
      <Route path='/admin/users' element={
        <AdminRoute>
          <GetAllUser />
        </AdminRoute>
      } />
      <Route path='/admin/inventory/add' element={
        <AdminRoute>
          <AddInventory />
        </AdminRoute>
      } />
        <Route path='/admin/inventory' element={
          <AdminRoute>
            <GetAllInventory />
          </AdminRoute>
        } />


      {/* Teacher Dashboard route */}
      <Route path='/teacher-dashboard' element={
        <ProtectedRoute>
          <TeacherDashboard />
        </ProtectedRoute>
      } />
  <Route path='/reset-password' element={<ResetPasswordPage />} />
  <Route path='/profile' element={<UserProfilePage />} />
    </Routes>
  )
}

export default App