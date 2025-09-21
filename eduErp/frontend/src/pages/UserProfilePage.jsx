import React, { useEffect, useState } from 'react';
import authService from '../services/authService.js';
import UserProfile from '../components/UserProfile.jsx';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authService.getProfile();
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <UserProfile user={profile?.user} details={profile?.details} />
      </div>
    </div>
  );
};

export default UserProfilePage;
