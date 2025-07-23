import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://expense-tracker-jw02.onrender.com";

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const submit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must login first.');
      window.location.href = '/';
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/expenses`,
        { amount, category, date, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAdd();
      setAmount('');
      setCategory('');
      setDate('');
      setNotes('');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        window.location.href = '/';
      } else if (err.response?.status === 403) {
        alert('Access denied.');
      } else {
        alert('Failed to add expense');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Add New Expense</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default ExpenseForm;
