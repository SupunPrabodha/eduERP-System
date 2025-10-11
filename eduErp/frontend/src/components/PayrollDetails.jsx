
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { api } from '../services/authService.js';

// const PayrollDetails = () => {
// 	const { id } = useParams();
// 	const navigate = useNavigate();
// 	const [payroll, setPayroll] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const [deductionReason, setDeductionReason] = useState('');
// 	const [deductionAmount, setDeductionAmount] = useState('');
// 		const [deductionSuccess, setDeductionSuccess] = useState('');
// 		const [deductionError, setDeductionError] = useState('');
// 		const [approveLoading, setApproveLoading] = useState(false);
// 		const [approveError, setApproveError] = useState('');
// 		const [approveSuccess, setApproveSuccess] = useState('');
// 		const [deductions, setDeductions] = useState([]);
// 	const handleApprove = async () => {
// 		setApproveLoading(true);
// 		setApproveError('');
// 		setApproveSuccess('');
// 		try {
// 			await api.put(`/payroll/${payroll._id}/approve`);
// 			setApproveSuccess('Payroll approved successfully.');
// 			setPayroll({ ...payroll, status: 'approved' });
// 		} catch (err) {
// 			setApproveError('Failed to approve payroll.');
// 		} finally {
// 			setApproveLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		const fetchPayroll = async () => {
// 			try {
// 				const res = await api.get(`/payroll/${id}`);
// 				setPayroll(res.data);
// 				// Fetch deductions for this payroll's user/month/year
// 				if (res.data && res.data.userId && res.data.month && res.data.year) {
// 					const dedRes = await api.get(`/deductions/user/${res.data.userId._id}`);
// 					// Filter for current payroll's month/year
// 					const filtered = dedRes.data.filter(d => d.month === res.data.month && d.year === res.data.year);
// 					setDeductions(filtered);
// 				}
// 			} catch (err) {
// 				setError('Failed to fetch payroll details.');
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		if (id) fetchPayroll();
// 	}, [id]);

// 	const handleDeductionSave = async (e) => {
// 		e.preventDefault();
// 		setDeductionSuccess('');
// 		setDeductionError('');
// 		if (!deductionReason || !deductionAmount) {
// 			setDeductionError('Please enter both reason and amount.');
// 			return;
// 		}
// 		if (!payroll.month || !payroll.year) {
// 			setDeductionError('Payroll month/year is missing. Cannot save deduction.');
// 			return;
// 		}
// 		try {
// 			await api.post('/deductions', {
// 				userId: payroll.userId._id,
// 				type: 'Salary Cut',
// 				amount: Number(deductionAmount),
// 				reason: deductionReason,
// 				month: payroll.month,
// 				year: payroll.year
// 			});
// 			setDeductionSuccess('Salary cut saved successfully.');
// 			setDeductionReason('');
// 			setDeductionAmount('');
// 			// Refresh deductions list
// 			const dedRes = await api.get(`/deductions/user/${payroll.userId._id}`);
// 			const filtered = dedRes.data.filter(d => d.month === payroll.month && d.year === payroll.year);
// 			setDeductions(filtered);
// 		} catch (err) {
// 			setDeductionError('Failed to save salary cut.');
// 		}
// 	};

// 	if (loading) return <div>Loading payroll details...</div>;
// 	if (error) return <div>{error}</div>;
// 	if (!payroll) return <div>No payroll record found.</div>;

// 	const profile = payroll.userId?.profile;
// 	return (
// 		<div style={{ maxWidth: '520px', margin: '48px auto', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)', borderRadius: '18px', boxShadow: '0 6px 32px rgba(49,46,129,0.10)', padding: '40px 32px', position: 'relative' }}>
// 			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
// 				<div style={{ background: '#6366f1', borderRadius: '50%', width: '54px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(49,46,129,0.10)' }}>
// 					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="28" height="28">
// 						<path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" />
// 						<path d="M9 21h6" />
// 						<path d="M12 17v4" />
// 					</svg>
// 				</div>
// 				<h2 style={{ marginLeft: '18px', fontWeight: 700, fontSize: '2rem', color: '#312e81', letterSpacing: '0.01em' }}>Payroll Details</h2>
// 			</div>
// 			<div style={{ background: '#fff', borderRadius: '14px', boxShadow: '0 2px 8px rgba(49,46,129,0.06)', padding: '28px 24px', marginBottom: '24px' }}>
// 				<table style={{ width: '100%', fontSize: '1.08rem', color: '#374151', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
// 					<tbody>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1', width: '38%' }}>User</td><td>{profile ? `${profile.firstName} ${profile.lastName}` : payroll.userId?.userId || ''}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Role</td><td>{payroll.userId?.role || ''}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Month</td><td>{payroll.month}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Year</td><td>{payroll.year}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Basic Salary</td><td>{payroll.basicSalary}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Allowances</td><td>{payroll.allowances}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Deductions</td><td>{payroll.deductions}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Overtime</td><td>{payroll.overtime}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Net Salary</td><td>{payroll.netSalary}</td></tr>
// 						<tr><td style={{ fontWeight: 600, color: '#6366f1' }}>Status</td><td>{payroll.status}</td></tr>
// 					</tbody>
// 				</table>
// 			</div>
// 			{/* Salary Cuts Section */}
// 			<div style={{ background: '#fff', borderRadius: '14px', boxShadow: '0 2px 8px rgba(49,46,129,0.06)', padding: '24px 20px', marginBottom: '24px' }}>
// 				<h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#312e81', marginBottom: '18px' }}>Add Salary Cut</h3>
// 				<form onSubmit={handleDeductionSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
// 					<input
// 						type="text"
// 						placeholder="Reason for salary cut"
// 						value={deductionReason}
// 						onChange={e => setDeductionReason(e.target.value)}
// 						style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
// 					/>
// 					<input
// 						type="number"
// 						placeholder="Amount"
// 						value={deductionAmount}
// 						onChange={e => setDeductionAmount(e.target.value)}
// 						style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
// 						min="0"
// 					/>
// 					<button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #312e81 100%)', color: '#fff', padding: '10px 0', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Save</button>
// 				</form>
// 				{deductionSuccess && <div style={{ color: '#16a34a', marginTop: '12px', fontWeight: 500 }}>{deductionSuccess}</div>}
// 				{deductionError && <div style={{ color: '#ef4444', marginTop: '12px', fontWeight: 500 }}>{deductionError}</div>}
// 			</div>
// 			{/* Deductions List Section */}
// 			<div style={{ background: '#fff', borderRadius: '14px', boxShadow: '0 2px 8px rgba(49,46,129,0.06)', padding: '24px 20px', marginBottom: '24px' }}>
// 				<h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#312e81', marginBottom: '18px' }}>Salary Cuts for this Payroll</h3>
// 				{deductions.length === 0 ? (
// 					<div style={{ color: '#64748b', fontStyle: 'italic' }}>No salary cuts recorded for this payroll.</div>
// 				) : (
// 					<table style={{ width: '100%', fontSize: '1.05rem', color: '#374151', borderCollapse: 'collapse' }}>
// 						<thead>
// 							<tr style={{ background: '#f3f4f6' }}>
// 								<th style={{ textAlign: 'left', padding: '8px', color: '#6366f1' }}>Reason</th>
// 								<th style={{ textAlign: 'left', padding: '8px', color: '#6366f1' }}>Amount</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{deductions.map((d, idx) => (
// 								<tr key={d._id || idx}>
// 									<td style={{ padding: '8px' }}>{d.reason}</td>
// 									<td style={{ padding: '8px' }}>{d.amount}</td>
// 								</tr>
// 							))}
// 						</tbody>
// 					</table>
// 				)}
// 			</div>
// 					<div style={{ textAlign: 'center', marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
// 						<button
// 							onClick={handleApprove}
// 							disabled={approveLoading || payroll.status === 'approved'}
// 							style={{ background: payroll.status === 'approved' ? '#a5b4fc' : 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)', color: '#fff', padding: '10px 32px', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '1.08rem', cursor: payroll.status === 'approved' ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px rgba(49,46,129,0.10)' }}
// 						>
// 							{approveLoading ? 'Approving...' : payroll.status === 'approved' ? 'Approved' : 'Approve'}
// 						</button>
// 						{approveSuccess && <div style={{ color: '#16a34a', fontWeight: 500 }}>{approveSuccess}</div>}
// 						{approveError && <div style={{ color: '#ef4444', fontWeight: 500 }}>{approveError}</div>}
// 						<button onClick={() => navigate(-1)} style={{ background: 'linear-gradient(90deg, #6366f1 0%, #312e81 100%)', color: '#fff', padding: '10px 32px', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '1.08rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(49,46,129,0.10)' }}>Back</button>
// 					</div>
// 		</div>
// 	);
// };

// export default PayrollDetails;


















import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/authService.js";

const PayrollDetails = ({ user, handleLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // deduction states
  const [deductionReason, setDeductionReason] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");
  const [deductions, setDeductions] = useState([]);
  const [deductionSuccess, setDeductionSuccess] = useState("");
  const [deductionError, setDeductionError] = useState("");

  // approve states
  const [approveLoading, setApproveLoading] = useState(false);
  const [approveError, setApproveError] = useState("");
  const [approveSuccess, setApproveSuccess] = useState("");

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await api.get(`/payroll/${id}`);
        setPayroll(res.data);

        if (res.data?.userId?._id && res.data.month && res.data.year) {
          const dedRes = await api.get(`/deductions/user/${res.data.userId._id}`);
          const filtered = dedRes.data.filter(
            (d) => d.month === res.data.month && d.year === res.data.year
          );
          setDeductions(filtered);
        }
      } catch {
        setError("Failed to fetch payroll details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPayroll();
  }, [id]);

  const handleApprove = async () => {
    setApproveLoading(true);
    setApproveError("");
    setApproveSuccess("");
    try {
      await api.put(`/payroll/${payroll._id}/approve`);
      setApproveSuccess("Payroll approved successfully.");
      setPayroll({ ...payroll, status: "approved" });
    } catch {
      setApproveError("Failed to approve payroll.");
    } finally {
      setApproveLoading(false);
    }
  };

  const handleDeductionSave = async (e) => {
    e.preventDefault();
    setDeductionSuccess("");
    setDeductionError("");
    if (!deductionReason || !deductionAmount) {
      setDeductionError("Please enter both reason and amount.");
      return;
    }
    try {
      await api.post("/deductions", {
        userId: payroll.userId._id,
        type: "Salary Cut",
        amount: Number(deductionAmount),
        reason: deductionReason,
        month: payroll.month,
        year: payroll.year,
      });
      setDeductionSuccess("Salary cut saved successfully.");
      setDeductionReason("");
      setDeductionAmount("");

      const dedRes = await api.get(`/deductions/user/${payroll.userId._id}`);
      const filtered = dedRes.data.filter(
        (d) => d.month === payroll.month && d.year === payroll.year
      );
      setDeductions(filtered);
    } catch {
      setDeductionError("Failed to save salary cut.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading payroll details...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!payroll) return <div className="text-gray-600 text-center mt-10">No payroll record found.</div>;

  const profile = payroll.userId?.profile;

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">
                eduERP Payroll Management
              </h1>
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

      {/* Page Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Payroll Details Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-4">Staff Payroll Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <InfoItem label="User" value={profile ? `${profile.firstName} ${profile.lastName}` : payroll.userId?.userId}  />
            <InfoItem label="Role" value={payroll.userId?.role} />
            <InfoItem label="Month" value={payroll.month} />
            <InfoItem label="Year" value={payroll.year} />
            <InfoItem label="Basic Salary" value={payroll.basicSalary}  />
            <InfoItem label="Allowances" value={payroll.allowances} />
            <InfoItem label="Deductions" value={payroll.deductions}  />
            <InfoItem label="Overtime" value={payroll.overtime}  />
          </div>
          {/* Net Salary + Status */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
            <div className="text-lg font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg shadow-sm">
              Net Salary: {payroll.netSalary}
            </div>
            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                payroll.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              Status: {payroll.status}
            </div>
          </div>
        </div>

        {/* Add Salary Cut */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">Add Salary Cut</h3>
          <form onSubmit={handleDeductionSave} className="space-y-3">
            <input
              type="text"
              placeholder="Reason for salary cut"
              value={deductionReason}
              onChange={(e) => setDeductionReason(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-200"
            />
            <input
              type="number"
              placeholder="Amount"
              value={deductionAmount}
              onChange={(e) => setDeductionAmount(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-200"
              min="0"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </form>
          {deductionSuccess && <div className="text-green-600 mt-2">{deductionSuccess}</div>}
          {deductionError && <div className="text-red-600 mt-2">{deductionError}</div>}
        </div>

        {/* Deductions List */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">Salary Cuts for this Payroll</h3>
          {deductions.length === 0 ? (
            <p className="text-gray-500 italic">No salary cuts recorded for this payroll.</p>
          ) : (
            <table className="w-full border rounded-md overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 text-indigo-600">Reason</th>
                  <th className="text-left py-2 px-3 text-indigo-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {deductions.map((d, idx) => (
                  <tr key={d._id || idx} className="border-t">
                    <td className="py-2 px-3">{d.reason}</td>
                    <td className="py-2 px-3">{d.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleApprove}
            disabled={approveLoading || payroll.status === "approved"}
            className={`px-6 py-2 rounded-md font-semibold shadow-md transition ${
              payroll.status === "approved"
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {approveLoading ? "Approving..." : payroll.status === "approved" ? "Approved" : "Approve"}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Back
          </button>
        </div>

        {approveSuccess && <p className="text-green-600 text-center mt-4">{approveSuccess}</p>}
        {approveError && <p className="text-red-600 text-center mt-4">{approveError}</p>}
      </main>
    </div>
  );
};

// Small reusable info item
const InfoItem = ({ label, value, icon }) => (
  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
    <span className="text-indigo-500">{icon}</span>
    <p>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  </div>
);

export default PayrollDetails;
