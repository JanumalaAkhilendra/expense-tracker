import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const BACKEND_URL = "https://expense-tracker-jw02.onrender.com";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must login first.');
      window.location.href = '/';
      return;
    }
    try {
      const res = await axios.get(`${BACKEND_URL}/api/expenses/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        window.location.href = '/';
      } else if (err.response?.status === 403) {
        alert('Access denied.');
      } else {
        alert('Failed to fetch expenses');
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Expenses</h2>

        {/* Expense Form */}
        <div className="mb-10">
          <ExpenseForm onAdd={fetchExpenses} />
        </div>

        {/* Expense List */}
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}

export default Dashboard;
