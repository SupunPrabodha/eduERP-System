import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col">
      <header className="w-full flex justify-end p-6">
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors"
        >
          Login
        </button>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">Welcome to eduERP System</h1>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Streamline your educational institution's management with our all-in-one ERP solution. Manage users, inventory, leave, payroll, and more with ease.
        </p>
        <img src="/vite.svg" alt="eduERP Logo" className="w-32 h-32 mx-auto" />
      </main>
    </div>
  );
};

export default Home;
