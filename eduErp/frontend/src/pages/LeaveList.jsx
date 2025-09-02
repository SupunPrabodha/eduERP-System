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
        setLeaves(response.data);
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
    <div>
      <h2>Leave Applications</h2>
      {leaves.length === 0 ? (
        <p>No leave applications found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Staff</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave._id}</td>
                <td>{leave.staffName || leave.staff || '-'}</td>
                <td>{leave.type || '-'}</td>
                <td>{leave.fromDate ? new Date(leave.fromDate).toLocaleDateString() : '-'}</td>
                <td>{leave.toDate ? new Date(leave.toDate).toLocaleDateString() : '-'}</td>
                <td>{leave.status || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveList;
