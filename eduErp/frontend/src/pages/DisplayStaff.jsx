import React, { useEffect, useState } from 'react';

const DisplayStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch('http://localhost:5000/staff');
        const data = await res.json();
        if (res.ok) {
          setStaff(data.staffM || []);
        } else {
          setError(data.message || 'Failed to fetch staff');
        }
      } catch (err) {
        setError('Server error');
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">All Staff Members</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : staff.length === 0 ? (
        <div>No staff members found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Employee ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Age</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Mobile</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Salary</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{s.employeeid}</td>
                  <td className="py-2 px-4 border">{s.name}</td>
                  <td className="py-2 px-4 border">{s.age}</td>
                  <td className="py-2 px-4 border">{s.department}</td>
                  <td className="py-2 px-4 border">{s.email}</td>
                  <td className="py-2 px-4 border">{s.mobile}</td>
                  <td className="py-2 px-4 border">{s.status}</td>
                  <td className="py-2 px-4 border">{s.address}</td>
                  <td className="py-2 px-4 border">{s.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayStaff;
