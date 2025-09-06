import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ManageLeave = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [leave, setLeave] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [statusUpdating, setStatusUpdating] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const fetchLeave = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`/api/leaves/${id}`);
				setLeave(response.data);
			} catch (err) {
				setError(err.response?.data?.error || 'Failed to fetch leave details');
			} finally {
				setLoading(false);
			}
		};
		fetchLeave();
	}, [id]);

	const handleStatusChange = async (newStatus) => {
		setStatusUpdating(true);
		try {
			await axios.put(`/api/leaves/${id}`, { status: newStatus });
			setLeave((prev) => ({ ...prev, status: newStatus }));
		} catch (err) {
			setError(err.response?.data?.error || 'Failed to update status');
		} finally {
			setStatusUpdating(false);
		}
	};

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this leave request?')) {
			setDeleting(true);
			try {
				await axios.delete(`/api/leaves/${id}`);
				// Redirect to leave list or another page after deletion
				navigate('/leaves');
			} catch (err) {
				setError(err.response?.data?.error || 'Failed to delete leave');
			} finally {
				setDeleting(false);
			}
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading leave details...</p>
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="bg-white rounded-lg shadow p-6">
					<p className="text-red-600 text-lg font-semibold">{error}</p>
				</div>
			</div>
		);
	}
	if (!leave) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="bg-white rounded-lg shadow p-6">
					<p className="text-gray-700 text-lg font-semibold">No leave found.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-neutral-100">
			{/* Header */}
			<header className="bg-white shadow">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
							<h1 className="ml-3 text-2xl font-semibold text-gray-900">Manage Leave</h1>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="bg-white rounded-lg shadow p-6 relative">
						{/* Delete button top right */}
						<button
							className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors text-sm font-medium shadow"
							onClick={handleDelete}
							disabled={deleting}
						>
							{deleting ? 'Deleting...' : 'Delete'}
						</button>
						<h2 className="text-xl font-semibold text-gray-900 mb-4">Leave Details</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Name</label>
								<p className="mt-1 text-sm text-gray-900">{leave.name || '-'}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Leave Type</label>
								<p className="mt-1 text-sm text-gray-900">{leave.leaveType || '-'}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">From</label>
								<p className="mt-1 text-sm text-gray-900">{leave.fromDate ? new Date(leave.fromDate).toLocaleDateString() : '-'}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">To</label>
								<p className="mt-1 text-sm text-gray-900">{leave.toDate ? new Date(leave.toDate).toLocaleDateString() : '-'}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Status</label>
								<p className="mt-1 text-sm text-gray-900">{leave.status || '-'}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Reason</label>
								<p className="mt-1 text-sm text-gray-900">{leave.reason || '-'}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Created At</label>
								<p className="mt-1 text-sm text-gray-900">{leave.createdAt ? new Date(leave.createdAt).toLocaleDateString() : '-'}</p>
							</div>
						</div>
						{statusUpdating && <p className="mt-2 text-gray-500">Updating status...</p>}
					</div>
					{/* Buttons below card */}
					<div className="flex gap-4 mt-8 justify-center">
						<button
							className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
							disabled={statusUpdating}
							onClick={() => handleStatusChange('Approved')}
						>
							Approve
						</button>
						<button
							className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
							disabled={statusUpdating}
							onClick={() => handleStatusChange('Rejected')}
						>
							Reject
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ManageLeave;
