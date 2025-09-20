// LoginPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';

const LOGIN_ERROR_KEY = 'login_error_message';

const isRealTyping = (nativeEvent) => {
  // Only clear the error on actual user typing/backspace/delete, not autofill or programmatic value sets
  // Common values: 'insertText', 'deleteContentBackward', 'deleteContentForward'
  // When clicking "Sign In" some browsers emit 'insertReplacementText' or undefined -> don't clear
  const t = nativeEvent?.inputType;
  return t === 'insertText' || t === 'deleteContentBackward' || t === 'deleteContentForward';
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const submittedRef = useRef(false);

  // Restore any persisted error (in case a refresh happened)
  useEffect(() => {
    const stored = sessionStorage.getItem(LOGIN_ERROR_KEY);
    if (stored) {
      setError(stored);
    }
  }, []);

  // Keep error persisted so unexpected reloads won't hide it
  useEffect(() => {
    if (error) {
      sessionStorage.setItem(LOGIN_ERROR_KEY, error);
    } else {
      sessionStorage.removeItem(LOGIN_ERROR_KEY);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value, nativeEvent } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error ONLY when the user actually types (not autofill/change after submit)
    if (error && isRealTyping(nativeEvent)) {
      setError('');
    }
  };

  // Fallback for browsers that don’t pass a useful inputType on onChange:
  // We also listen to onInput and apply the same rule.
  const handleInput = (e) => {
    if (error && isRealTyping(e.nativeEvent)) {
      setError('');
    }
  };

  const handleLogin = async (e) => {
    // Prevent any default form navigation
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;
    submittedRef.current = true;

    setIsLoading(true);
    setError(''); // clear any previous error for this attempt

    try {
      const userId = formData.userId.trim();
      const password = formData.password;

      const response = await authService.login(userId, password);

      if (response?.success) {
        const user = response.data.user;

        // If you store token here, uncomment:
        // localStorage.setItem('token', response.data.token);

        // Clear any error before navigating
        setError('');
        // Navigate without full reload
        if (user.role === 'ADMIN') {
          navigate('/admin', { replace: true });
        } else if (user.role === 'TEACHER') {
          navigate('/teacher-dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
        return;
      }

      // Show backend message or a safe fallback
      setError(response?.message || 'Invalid User ID or password');
    } catch (err) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
      submittedRef.current = false;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-900/20 via-white/20 to-green-900/20 backdrop-blur-sm"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-400/30 to-green-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/30 to-sky-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/20 to-sky-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <div className="relative w-full max-w-md">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-600 via-green-600 to-sky-600 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                    <path d="m9 18 6-12" />
                    <path d="m7 8-4 4 4 4" />
                    <path d="m17 8 4 4-4 4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-sm">eduERP</h1>
                  <p className="text-sky-100 text-sm">Educational Resource Planning</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back!</h2>
              <p className="text-gray-600 mb-6">Sign in to your account to continue</p>

              {/* Error */}
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleLogin} noValidate autoComplete="off">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleInputChange}
                      onInput={handleInput}
                      placeholder="ex: LC92311"
                      className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                      required
                      autoComplete="new-username" // discourage autofill
                      inputMode="text"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onInput={handleInput}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                      required
                      autoComplete="new-password" // discourage autofill after submit
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-green-600 hover:from-sky-700 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center">
                <a
                  href="/reset-password"
                  className="text-sky-600 hover:underline font-medium mb-2"
                >
                  Change password
                </a>
                <p className="text-center text-sm text-gray-500">
                  Secure access to eduERP system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
