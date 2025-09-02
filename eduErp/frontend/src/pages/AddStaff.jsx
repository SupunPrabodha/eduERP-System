import React, { useState } from 'react';

const AddStaff = () => {
  const [form, setForm] = useState({
    employeeid: '',
    name: '',
    dob: '',
    department: '',
    email: '',
    mobile: '',
    address: '',
    salary: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
  const res = await fetch('http://localhost:5555/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Staff member added successfully!');
        setForm({
          employeeid: '', name: '', dob: '', department: '', email: '', mobile: '', address: '', salary: ''
        });
      } else {
        setMessage(data.message || 'Error adding staff member');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Staff Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block text-gray-700 capitalize mb-1">{key === 'dob' ? 'Date of Birth' : key}</label>
            <input
              type={key === 'dob' ? 'date' : key === 'salary' ? 'number' : 'text'}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Staff</button>
      </form>
      {message && <div className="mt-4 text-center text-red-600">{message}</div>}
    </div>
  );
};

export default AddStaff;
