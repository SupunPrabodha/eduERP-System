import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService.js';

const TeacherDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">eduERP Teacher Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.userId}</span>
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
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <p className="mt-1 text-sm text-gray-900">{user?.userId}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Submit Leave */}
              <Link
                to="/leaves/apply"
                className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left block"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex items-center">
                  <span className="h-8 w-8 flex items-center justify-center text-indigo-600 mr-3 text-2xl font-bold">+</span>
                  <div>
                    <h3 className="font-medium text-indigo-900">Submit Leave</h3>
                    <p className="text-sm text-indigo-700 mt-1">Apply for leave</p>
                  </div>
                </div>
              </Link>
              {/* Check Inventory */}
              <button
                onClick={() => navigate('/inventory')}
                className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors text-left"
              >
                <div className="flex items-center">
                  <span className="h-8 w-8 flex items-center justify-center text-indigo-600 mr-3 text-2xl">📦</span>
                  <div>
                    <h3 className="font-medium text-indigo-900">Request Inventory</h3>
                    <p className="text-sm text-indigo-700 mt-1">View available inventory</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;