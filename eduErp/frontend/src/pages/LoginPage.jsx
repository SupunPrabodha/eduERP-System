import React, { useState } from 'react';
import authService from '../services/authService.js';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(formData.email, formData.password);
      if (response.success) {
        // Redirect to dashboard or home page
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue">
      {/* Decorative gradient waves background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-200 via-indigo-300 to-indigo-400 opacity-50 blur-3xl" />
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 h-64 w-full text-indigo-400/60"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,128L48,144C96,160,192,192,288,176C384,160,480,96,576,96C672,96,768,160,864,181.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Content container */}
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/70 p-8 shadow-xl backdrop-blur">
          {/* Brand */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
              {/* Simple code icon */}
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
            <div>
              <p className="text-xl font-semibold text-black drop-shadow-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.15)]">
                eduERP
              </p>
            </div>
          </div>

          <h1 className="mb-6 text-2xl font-semibold text-slate-800">Welcome back!</h1>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-11 text-slate-800 outline-none ring-indigo-200 transition focus:ring-4"
                  required
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center text-slate-400">
                  {/* Mail icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="m4 6 8 6 8-6" />
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-11 text-slate-800 outline-none ring-indigo-200 transition focus:ring-4"
                  required
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center text-slate-400">
                  {/* Lock icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-indigo-700 px-4 py-3 font-medium text-white shadow hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Login Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
