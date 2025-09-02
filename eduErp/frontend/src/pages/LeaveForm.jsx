

import React, { useState } from "react";
import "./LeaveForm.css";



const LeaveForm = () => {
  const [form, setForm] = useState({
    name: '',
    leaveType: 'sick',
    fromDate: '',
    toDate: '',
    reason: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Leave application submitted successfully!');
        setForm({ name: '', leaveType: 'sick', fromDate: '', toDate: '', reason: '' });
      } else {
        setMessage(data.error || 'Error submitting leave application');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Leave Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Leave Type</label>
          <select
            name="leaveType"
            value={form.leaveType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="annual">Annual Leave</option>
          </select>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">From</label>
            <input
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">To</label>
            <input
              type="date"
              name="toDate"
              value={form.toDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Reason</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
      {message && <div className="mt-4 text-center text-red-600">{message}</div>}
    </div>
  );
};

export default LeaveForm;
