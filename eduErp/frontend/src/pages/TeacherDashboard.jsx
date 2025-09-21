import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../services/authService.js";

const SIDEBAR_WIDTH = "18rem"; // Tailwind w-72

const TeacherDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-slate-900">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/assets/eduERP-logo.png"
              alt="eduERP"
              className="h-7 w-auto"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="font-semibold">eduERP • Teacher</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar (desktop fixed) */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-72 shadow-lg" style={{ width: SIDEBAR_WIDTH }}>
        <SidebarContent
          role="TEACHER"
          user={user}
          onLogout={handleLogout}
          onNavigate={() => {}}
        />
      </aside>

      {/* Off-canvas sidebar (mobile) */}
      {sidebarOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shadow-xl">
            <SidebarContent
              role="TEACHER"
              user={user}
              onLogout={() => {
                setSidebarOpen(false);
                handleLogout();
              }}
              onNavigate={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="relative flex flex-col">
        {/* Reserve space for the fixed desktop sidebar */}
        <div className="hidden md:block" style={{ height: 0, marginLeft: SIDEBAR_WIDTH }} />

        {/* Page header */}
        <header className="bg-gradient-to-r from-blue-50 to-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:ml-72">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">
              Submit leave requests and view inventory availability. Use the quick actions below or the left navigation.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:ml-72">
          {/* User info card */}
          <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Name" value={user?.name || "—"} />
              <InfoRow label="Email" value={user?.email || "—"} />
              <InfoRow label="Role" value={user?.role ? user.role.toUpperCase() : "—"} />
              <InfoRow label="User ID" value={user?.userId || "—"} />
            </div>
          </section>

          {/* Quick Actions */}
          <section className="mt-6 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActionCard
                onClick={() => navigate("/leaves/apply")}
                title="Submit Leave"
                subtitle="Apply for leave"
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />}
              />
              <ActionCard
                onClick={() => navigate("/inventory")}
                title="Request Inventory"
                subtitle="View available inventory"
                iconColor="text-emerald-600"
                bgColor="bg-emerald-50"
                icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M6 7v10M18 7v10M3 12h18" />}
              />
              <SimpleActionCard
                onClick={() => navigate("/profile")}
                title="My Profile"
                subtitle="View or update profile details"
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-10 border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 md:ml-72">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-600">
            © {new Date().getFullYear()} eduERP · Teacher Console · Serandib College
          </div>
        </footer>
      </div>
    </div>
  );
};

/* -------------------------
   Sidebar content
--------------------------*/
function SidebarContent({ role = "TEACHER", user, onLogout, onNavigate }) {
  return (
    <div className="relative h-full w-full">
      {/* Background image reused from Home page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,64,0.72), rgba(0,0,64,0.72)), url('/assets/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="h-full flex flex-col text-white">
        {/* Brand */}
        <div className="px-4 py-5 border-b border-white/20">
          <div className="flex items-center gap-3">
            <img
              src="/assets/eduERP-logo.png"
              alt="eduERP"
              className="h-8 w-auto"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="leading-tight">
              <div className="font-semibold">eduERP • Teacher</div>
              <div className="text-xs text-blue-100/90">Serandib College</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 space-y-1">
          <SideNavItem to="/teacher-dashboard" label="Dashboard" onNavigate={onNavigate} icon="home" />
          <SideNavItem to="/leaves/apply" label="Submit Leave" onNavigate={onNavigate} icon="leave" />
          <SideNavItem to="/inventory" label="Request Inventory" onNavigate={onNavigate} icon="box" />
          <SideNavItem to="/profile" label="My Profile" onNavigate={onNavigate} icon="user" />
        </nav>

        {/* Divider */}
        <div className="mt-auto border-t border-white/15 px-4 py-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <div className="font-medium">{user?.name || user?.userId}</div>
              <div className="text-blue-100/90">{role}</div>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideNavItem({ to, label, onNavigate, icon }) {
  const iconMap = {
    home: <path d="M3 10.5 12 3l9 7.5V21H3V10.5z" />,
    leave: <path d="M8 2v4M16 2v4M3 10h18M5 6h14v12H5z" />,
    box: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4 7-4A2 2 0 0 0 21 16z" />,
    user: <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9v-2a5 5 0 0 0-5-5H10a5 5 0 0 0-5 5v2" />,
  };

  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition border border-transparent ${
          isActive
            ? "bg-white text-blue-700 shadow-sm"
            : "text-blue-50/95 hover:bg-white/10 hover:border-white/20"
        }`
      }
    >
      <svg className="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
        {iconMap[icon] || <path d="M4 6h16M4 12h16M4 18h16" />}
      </svg>
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}

/* -------------------------
   Small UI helpers
--------------------------*/
function InfoRow({ label, value }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500">{label}</label>
      <p className="mt-1 text-sm text-slate-900">{value}</p>
    </div>
  );
}

function ActionCard({ onClick, title, subtitle, iconColor = "text-blue-600", bgColor = "bg-blue-50", icon }) {
  return (
    <button
      onClick={onClick}
      className={${bgColor} p-4 rounded-xl hover:bg-white border border-transparent hover:border-blue-100 shadow-sm hover:shadow-md transition text-left w-full}
    >
      <div className="flex items-start gap-3">
        <div className={flex h-10 w-10 items-center justify-center rounded-lg bg-white ${iconColor}}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
        </div>
      </div>
    </button>
  );
}

function SimpleActionCard({ onClick, title, subtitle }) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-50 p-4 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 shadow-sm hover:shadow-md transition text-left w-full"
    >
      <h3 className="font-medium text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
    </button>
  );
}

export default TeacherDashboard;