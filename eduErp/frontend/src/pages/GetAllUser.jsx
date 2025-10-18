import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const GetAllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Placeholder: get username from localStorage or context if available
  const username = localStorage.getItem('username') || 'User';
  const navigate = useNavigate();
  // Handler to navigate to user details
  const handleUserClick = (userId) => {
    navigate(`/user-details/${userId}`);
  };

  // Handler to delete user
  const handleDeleteUser = async (e, userId) => {
    e.stopPropagation(); // Prevent row click
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        setUsers(prev => prev.filter(u => u.userId !== userId));
      } catch (err) {
        alert(err.message || 'Failed to delete user');
      }
    }
  };

  // Logout handler
  const handleLogout = () => {
    // Remove auth info (customize as needed)
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getAllUsers();
        setUsers(res.users || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Filtering logic
  const filteredUsers = users.filter(user => {
    // Search by name, email, or userId
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      (user.userId && user.userId.toLowerCase().includes(search)) ||
      (user.email && user.email.toLowerCase().includes(search)) ||
      (user.profile && (
        (user.profile.firstName && user.profile.firstName.toLowerCase().includes(search)) ||
        (user.profile.lastName && user.profile.lastName.toLowerCase().includes(search))
      ));
    // Filter by role
    const matchesRole = !roleFilter || user.role === roleFilter;
    // Filter by status
    const matchesStatus = !statusFilter || (statusFilter === 'active' ? user.isActive : !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Unique roles for filter dropdown
  const uniqueRoles = Array.from(new Set(users.map(u => u.role))).filter(Boolean);

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="m9 18 6-12" />
                  <path d="m7 8-4 4 4 4" />
                  <path d="m17 8 4 4-4 4" />
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">All Users</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Hello, {username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search, Role Filter, Status Filter - inside marked area, below header, above User List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-end">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[180px]"
          />
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}</option>
            ))}
          </select>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User List</h2>
            {filteredUsers.length === 0 ? (
              <p className="text-gray-600">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                      <tr
                        key={user._id}
                        className="hover:bg-indigo-50 cursor-pointer"
                        onClick={() => handleUserClick(user.userId)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.userId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.profile?.firstName} {user.profile?.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium text-xs focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={e => handleDeleteUser(e, user.userId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetAllUser;
