import React from 'react';


const UserProfile = ({ user, details }) => {
  if (!user) return null;

  const fullName = user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user.name;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-sm text-gray-900">{fullName}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-sm text-gray-900">{user.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="mt-1 text-sm text-gray-900 capitalize">{user.role}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <p className="mt-1 text-sm text-gray-900">{user.userId}</p>
        </div>
        {user.profile && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <p className="mt-1 text-sm text-gray-900">{user.profile.dob ? new Date(user.profile.dob).toLocaleDateString() : ''}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1 text-sm text-gray-900">{user.profile.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 text-sm text-gray-900">{user.profile.address}</p>
            </div>
          </>
        )}
        {user.phone && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
          </div>
        )}
        {user.remarks && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <p className="mt-1 text-sm text-gray-900">{user.remarks}</p>
          </div>
        )}
        {user.isActive !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p className="mt-1 text-sm text-gray-900">{user.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        )}
        {/* Teacher-specific details */}
        {user.role === 'TEACHER' && details && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">NIC</label>
              <p className="mt-1 text-sm text-gray-900">{details.nic}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subjects</label>
              <p className="mt-1 text-sm text-gray-900">{details.subjects?.join(', ')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <p className="mt-1 text-sm text-gray-900">{details.section}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <p className="mt-1 text-sm text-gray-900">{details.qualification}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <p className="mt-1 text-sm text-gray-900">{details.experience} years</p>
            </div>
          </>
        )}
        {/* Student-specific details */}
        {user.role === 'STUDENT' && details && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admission No</label>
              <p className="mt-1 text-sm text-gray-900">{details.admissionNo}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grade</label>
              <p className="mt-1 text-sm text-gray-900">{details.grade}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <p className="mt-1 text-sm text-gray-900">{details.section}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
