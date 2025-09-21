import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';
import CreateUserForm from '../components/CreateUserForm.jsx';
import { FaUserCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/';
  };

  const handleCreateUser = () => {
    setShowCreateUserForm(true);
  };

  const handleCloseCreateUserForm = () => {
    setShowCreateUserForm(false);
  };

  const handleUserCreated = () => {
    // Refresh user list or show success message
    console.log('User created successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="m9 18 6-12" />
                  <path d="m7 8-4 4 4 4" />
                  <path d="m17 8 4 4-4 4" />
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.userId}</span>
              <button
                onClick={() => navigate('/profile')}
                className="focus:outline-none"
                title="View Profile"
              >
                <FaUserCircle className="text-3xl text-indigo-700 hover:text-indigo-900 transition-colors" />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* Role-based content */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user?.role === 'ADMIN' && (
                <>
                  <button
                    onClick={handleCreateUser}
                    className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left w-full"
                  >
                    <div className="flex items-center">
                      <svg className="h-8 w-8 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-indigo-900">Add New User</h3>
                        <p className="text-sm text-indigo-700 mt-1">Add new users to the system</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/admin/inventory/add')}
                    className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left w-full"
                  >
                    <div className="flex items-center">
                      <svg className="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-green-900">Add New Item</h3>
                        <p className="text-sm text-green-700 mt-1">Add new inventory items</p>
                      </div>
                    </div>
                  </button>
                  <button onClick={() => navigate('/admin/payroll')}
                    className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left w-full"
                  >
                    <div className="flex items-center">
                      <svg className="h-8 w-8 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M12 3v18" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-indigo-900">Payroll Management</h3>
                        <p className="text-sm text-indigo-700 mt-1">Manage staff payrolls and payslips</p>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/admin/users')}
                    className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left w-full"
                  >
                    <h3 className="font-medium text-indigo-900">Manage Users</h3>
                    <p className="text-sm text-indigo-700 mt-1">View, edit, or remove users</p>
                  </button>
                  <button
                    onClick={() => navigate('/admin/inventory')}
                    className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left w-full"
                  >
                    <h3 className="font-medium text-indigo-900">Inventory</h3>
                    <p className="text-sm text-indigo-700 mt-1">Manage inventory</p>
                  </button>
                  <button
                    onClick={() => navigate('/leaves')}
                    className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left w-full"
                  >
                    <h3 className="font-medium text-indigo-900">Leave Application</h3>
                    <p className="text-sm text-indigo-700 mt-1">Manage Leave Request</p>
                  </button>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-medium text-indigo-900">Reports</h3>
                    <p className="text-sm text-indigo-700 mt-1">View system reports</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-medium text-indigo-900">User Analytics</h3>
                    <p className="text-sm text-indigo-700 mt-1">View user statistics</p>
                  </div>
                </>
              )}
              
              {user?.role === 'TEACHER' && (
                <>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900">Manage Classes</h3>
                    <p className="text-sm text-green-700 mt-1">Create and manage classes</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900">Grade Students</h3>
                    <p className="text-sm text-green-700 mt-1">Assign grades and feedback</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900">Attendance</h3>
                    <p className="text-sm text-green-700 mt-1">Track student attendance</p>
                  </div>
                </>
              )}
              
              {user?.role === 'STUDENT' && (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900">My Courses</h3>
                    <p className="text-sm text-blue-700 mt-1">View enrolled courses</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900">Grades</h3>
                    <p className="text-sm text-blue-700 mt-1">Check your grades</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900">Schedule</h3>
                    <p className="text-sm text-blue-700 mt-1">View class schedule</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create User Form Modal */}
      {showCreateUserForm && (
        <CreateUserForm
          onClose={handleCloseCreateUserForm}
          onUserCreated={handleUserCreated}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
