import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OneComplaints = () => {
	const { complaintId } = useParams();
	const [complaint, setComplaint] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const [deleting, setDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState(null);

	useEffect(() => {
		const fetchComplaint = async () => {
			try {
				const response = await fetch(`/api/complaints/${complaintId}`);
				if (!response.ok) throw new Error("Failed to fetch complaint");
				const data = await response.json();
				setComplaint(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchComplaint();
	}, [complaintId]);

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this complaint?")) return;
		setDeleting(true);
		setDeleteError(null);
		try {
			const response = await fetch(`/api/complaints/${complaintId}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Failed to delete complaint");
			navigate("/complaints");
		} catch (err) {
			setDeleteError(err.message);
		} finally {
			setDeleting(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading complaint...</p>
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
	if (deleteError) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-red-600 font-semibold">Error: {deleteError}</p>
					<button
						onClick={() => setDeleteError(null)}
						className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
					>
						Back
					</button>
				</div>
			</div>
		);
	}

	if (!complaint) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-gray-600">Complaint not found.</p>
				</div>
			</div>
		);
	}

		return (
			<div className="min-h-screen bg-neutral-100">
				<header className="bg-white shadow">
					<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between py-6">
							<h1 className="text-2xl font-semibold text-gray-900">Complaint Details</h1>
							<button
								onClick={() => navigate(-1)}
								className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							>
								Back
							</button>
							<button
								onClick={handleDelete}
								disabled={deleting}
								className={`ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
							>
								{deleting ? "Deleting..." : "Delete"}
							</button>
						</div>
					</div>
				</header>
				<main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<span className="font-medium text-gray-700">Name:</span> {complaint.name}
							</div>
							<div>
								<span className="font-medium text-gray-700">Role:</span> {complaint.role}
							</div>
							<div>
								<span className="font-medium text-gray-700">Topic:</span> {complaint.reason}
							</div>
							<div>
								<span className="font-medium text-gray-700">Description:</span> {complaint.description}
							</div>
							<div>
								<span className="font-medium text-gray-700">Created At:</span> {new Date(complaint.createdAt).toLocaleString()}
							</div>
										{complaint.picture && (
											<div className="col-span-2 mt-4">
												<span className="font-medium text-gray-700">Picture:</span>
												<br />
																<img
																	  src={`http://localhost:5555/uploads/${complaint.picture.replace(/^uploads[\\\/]/, '').replace(/\\/g, '/')}`}
																	alt="Complaint"
																	style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '8px', marginTop: '8px' }}
																/>
											</div>
										)}
						</div>
					</div>
				</main>
			</div>
		);
};

export default OneComplaints;
