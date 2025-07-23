import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://expense-tracker-jw02.onrender.com";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');

  const handleRegister = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, { email, password, role });
      alert('Registration successful! Please login.');
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleRegister}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Register
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="/" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
