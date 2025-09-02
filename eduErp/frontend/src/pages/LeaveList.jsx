import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Leave Applications</h2>
      {leaves.length === 0 ? (
        <div>No leave applications found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Leave Type</th>
                <th className="py-2 px-4 border">From</th>
                <th className="py-2 px-4 border">To</th>
                <th className="py-2 px-4 border">Reason</th>
                <th className="py-2 px-4 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{leave.name || '-'}</td>
                  <td className="py-2 px-4 border">{leave.leaveType || '-'}</td>
                  <td className="py-2 px-4 border">{leave.fromDate ? new Date(leave.fromDate).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4 border">{leave.toDate ? new Date(leave.toDate).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4 border">{leave.reason || '-'}</td>
                  <td className="py-2 px-4 border">{leave.createdAt ? new Date(leave.createdAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
