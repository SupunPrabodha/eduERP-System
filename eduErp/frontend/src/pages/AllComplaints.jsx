import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllComplaints = () => {
	const navigate = useNavigate();
	const [complaints, setComplaints] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchComplaints = async () => {
			try {
				const response = await fetch("/api/complaints");
				if (!response.ok) throw new Error("Failed to fetch complaints");
				const data = await response.json();
				setComplaints(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchComplaints();
	}, []);

	if (loading) return <div>Loading complaints...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="min-h-screen bg-neutral-100">
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-6">
						<div className="flex items-center">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
									<path d="M12 2v20M2 12h20" />
								</svg>
							</div>
							<h1 className="ml-3 text-2xl font-semibold text-gray-900">All Complaints</h1>
						</div>
					</div>
				</div>
			</header>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-4">Complaint List</h2>
						{complaints.length === 0 ? (
							<p className="text-gray-600">No complaints found.</p>
						) : (
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
															{complaints.map((c, idx) => (
																<tr
																	key={c.complaintId || idx}
																	className="hover:bg-indigo-50 cursor-pointer"
																	onClick={() => navigate(`/complaints/${c.complaintId}`)}
																>
																	<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.name}</td>
																	<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{c.role}</td>
																	<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.reason}</td>
																	<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.description}</td>
																	<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(c.createdAt).toLocaleString()}</td>
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

export default AllComplaints;
