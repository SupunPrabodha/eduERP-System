import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background image + navy overlay for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,64,0.6), rgba(0,0,64,0.6)), url('/assets/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* HERO */}
      <main className="flex-1 flex items-center justify-center text-center px-6 py-14 md:py-20">
        <div className="max-w-3xl">
          {/* Logo */}
          <img
            src="/assets/eduERP-logo.png"
            alt="eduERP Logo"
            className="mx-auto h-40 w-auto mb-6 drop-shadow-lg"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />

          {/* Welcome */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
            Welcome to <span className="text-blue-300">eduERP</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 leading-relaxed">
            A modern ERP platform tailored for <strong>Serandib College</strong>. Streamline{" "}
            <span className="font-semibold text-white">Staff</span>,{" "}
            <span className="font-semibold text-white">Leave</span>,{" "}
            <span className="font-semibold text-white">Payroll</span>, and{" "}
            <span className="font-semibold text-white">Inventory</span> with secure, role-based access and
            audit-ready validations.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition"
              aria-label="Go to Login"
            >
              {/* lock icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90" aria-hidden="true">
                <path
                  d="M7 10V8a5 5 0 0 1 10 0v2M6 10h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Login
            </button>
          </div>
        </div>
      </main>

      {/* FEATURES (white/blue cards) */}
      <section className="relative z-10 -mt-6 md:-mt-10 pb-14 md:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <FeatureCard
              title="Staff Management"
              desc="Create and update staff profiles with unique NIC, roles, and status — centrally and securely."
              icon={
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm9 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <FeatureCard
              title="Leave Management"
              desc="Apply, track, and approve leave with entitlement checks and overlap prevention."
              icon={
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <FeatureCard
              title="Payroll Essentials"
              desc="Maintain salary inputs and compute net salary — base, allowances, and deductions — consistently."
              icon={
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M21 15V8a2 2 0 0 0-2-2H8m-5 5h12M3 21h12a2 2 0 0 0 2-2V6M3 6h12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <FeatureCard
              title="Inventory Tracking"
              desc="Register items, manage quantities, and surface low-stock alerts for timely replenishment."
              icon={
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* FOOTER (blue/white) */}
      <footer className="w-full mt-10 bg-blue-900/90 py-4">
        <p className="text-center text-sm text-blue-100">
          © {new Date().getFullYear()} eduERP · Built for Serandib College
        </p>
      </footer>
    </div>
  );
};

/* Reusable components */
function FeatureCard({ title, desc, icon }) {
  return (
    <div className="rounded-2xl bg-blue-100/80 border border-blue-50 shadow-sm hover:shadow-md transition p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <span aria-hidden="true" className="inline-block">
            {icon}
          </span>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
