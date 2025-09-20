import React, { useEffect, useState } from 'react';
import authService from '../services/authService.js';
import UserProfile from '../components/UserProfile.jsx';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default UserProfilePage;
