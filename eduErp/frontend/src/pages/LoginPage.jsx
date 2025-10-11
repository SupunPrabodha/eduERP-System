// LoginPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService.js";

const LOGIN_ERROR_KEY = "login_error_message";

const isRealTyping = (nativeEvent) => {
  const t = nativeEvent?.inputType;
  return t === "insertText" || t === "deleteContentBackward" || t === "deleteContentForward";
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const submittedRef = useRef(false);

  // Restore any persisted error (on refresh)
  useEffect(() => {
    const stored = sessionStorage.getItem(LOGIN_ERROR_KEY);
    if (stored) setError(stored);
  }, []);

  // Persist/clear error in sessionStorage
  useEffect(() => {
    if (error) sessionStorage.setItem(LOGIN_ERROR_KEY, error);
    else sessionStorage.removeItem(LOGIN_ERROR_KEY);
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value, nativeEvent } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error && isRealTyping(nativeEvent)) setError("");
  };

  const handleInput = (e) => {
    if (error && isRealTyping(e.nativeEvent)) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;

    submittedRef.current = true;
    setIsLoading(true);
    setError("");

    try {
      const userId = formData.userId.trim();
      const password = formData.password;

      const response = await authService.login(userId, password);

      if (response?.success) {
        const user = response.data.user;
        setError("");

        // Role-based SPA navigation
        const role = (user?.role || "").toUpperCase();
        if (role === "ADMIN") navigate("/admin", { replace: true });
        else if (role === "TEACHER") navigate("/teacher-dashboard", { replace: true });
        else navigate("/dashboard", { replace: true });
        return;
      }

      setError(response?.message || "Invalid User ID or password");
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      submittedRef.current = false;
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Brand hero background (consistent with other pages) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,64,0.6), rgba(0,0,64,0.6)), url('/assets/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Top brand bar */}
      <header className="w-full">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <img
              src="/assets/eduERP-logo.png"
              alt="eduERP Logo"
              className="h-8 w-auto"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="text-sm opacity-90">Serandib College</span>
          </div>
          <Link to="/" className="text-blue-100 hover:text-white text-sm underline underline-offset-4">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Centered card */}
      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Header strip */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-12" />
                    <path d="m7 8-4 4 4 4" />
                    <path d="m17 8 4 4-4 4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white drop-shadow-sm">eduERP</h1>
                  <p className="text-blue-100 text-xs">Educational Resource Planning</p>
                </div>
              </div>
            </div>

            {/* Form body */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welcome back!</h2>
              <p className="text-slate-600 mt-1 mb-5">Sign in to your account to continue</p>

              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleLogin} noValidate autoComplete="off">
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-slate-700 mb-2">
                    User ID
                  </label>
                  <div className="relative">
                    <input
                      id="userId"
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleInputChange}
                      onInput={handleInput}
                      placeholder="ex: LC92311"
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      autoComplete="username"
                      inputMode="text"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="text-sm text-blue-700 hover:text-blue-800"
                    >
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onInput={handleInput}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      autoComplete="current-password"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                        <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="4" opacity="0.75" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-90">
                        <path
                          d="M7 10V8a5 5 0 0 1 10 0v2M6 10h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Sign in
                    </>
                  )}
                </button>
              </form>

              {/* Secondary */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-500">or</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mt-4 text-center text-sm text-slate-600">
                Need access? <span className="text-slate-500">Ask your administrator to create an account.</span>
              </div>

              <div className="mt-6 text-center">
                <Link to="/reset-password" className="text-blue-700 hover:text-blue-800 text-sm font-medium">
                  Change password
                </Link>
                <p className="mt-2 text-xs text-slate-500">Secure access to eduERP system</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-blue-100">
            © {new Date().getFullYear()} eduERP · Serandib College
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;