import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('/api/leaves');
        setLeaves(Array.isArray(response.data) ? response.data : response.data.leaves || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch leaves');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leave applications...</p>
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

    return (
      <div className="min-h-screen bg-neutral-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="m9 18 6-12" />
                    <path d="m7 8-4 4 4 4" />
                    <path d="m17 8 4 4-4 4" />
                  </svg>
                </div>
                <h1 className="ml-3 text-2xl font-semibold text-gray-900">Leave Applications</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave List</h2>
              {leaves.length === 0 ? (
                <p className="text-gray-600">No leave applications found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaves.map((leave) => (
                        <tr key={leave._id} className="hover:bg-indigo-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.name || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.leaveType || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.fromDate ? new Date(leave.fromDate).toLocaleDateString() : '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.toDate ? new Date(leave.toDate).toLocaleDateString() : '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.status || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <button
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                              onClick={() => navigate(`/manage-leave/${leave._id}`)}
                            >
                              Manage
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

export default LeaveList;
