import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const UserDetails = () => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [updating, setUpdating] = useState(false);
	const [updateError, setUpdateError] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userService.getUserById(userId);
				setUser(res.user || null);
			} catch (err) {
				setError(err.message || 'Failed to fetch user details');
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [userId]);

	const handleToggleActive = async () => {
		if (!user) return;
		setUpdating(true);
		setUpdateError(null);
		try {
			const updatedUser = { ...user, isActive: !user.isActive };
			await userService.updateUser(user.userId, { isActive: updatedUser.isActive });
			setUser(updatedUser);
		} catch (err) {
			setUpdateError(err.message || 'Failed to update user status');
		} finally {
			setUpdating(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading user details...</p>
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
	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-gray-600">User not found.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-neutral-100">
			<header className="bg-white shadow">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-6">
						<h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
						<button
							onClick={() => navigate(-1)}
							className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
						>
							Back
						</button>
					</div>
				</div>
			</header>
			<main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">{user.profile?.firstName} {user.profile?.lastName}</h2>
					{updateError && <p className="text-red-600 mb-2">{updateError}</p>}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="text-gray-700"><span className="font-medium">User ID:</span> {user.userId}</p>
							<p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
							<p className="text-gray-700"><span className="font-medium">Role:</span> {user.role}</p>
							<p className="text-gray-700"><span className="font-medium">Phone:</span> {user.phone}</p>
							<p className="text-gray-700"><span className="font-medium">Status:</span> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.isActive ? 'Active' : 'Inactive'}</span></p>
							<button
								onClick={handleToggleActive}
								disabled={updating}
								className={`mt-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 ${user.isActive ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400' : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400'} ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
							>
								{updating ? 'Updating...' : user.isActive ? 'Deactivate User' : 'Activate User'}
							</button>
						</div>
						<div>
							<p className="text-gray-700"><span className="font-medium">First Name:</span> {user.profile?.firstName}</p>
							<p className="text-gray-700"><span className="font-medium">Last Name:</span> {user.profile?.lastName}</p>
							<p className="text-gray-700"><span className="font-medium">Address:</span> {user.profile?.address}</p>
							{/* Add more fields as needed */}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default UserDetails;
