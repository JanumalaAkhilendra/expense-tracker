import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartView from '../components/ChartView';

function AdminPanel() {
  const [expenses, setExpenses] = useState([]);

  const fetchAllExpenses = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(res.data);
    } catch (err) {
      alert('Failed to fetch expenses');
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`/api/expenses/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAllExpenses();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Panel</h2>

      <div className="mb-10">
        <ChartView />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Expense Requests</h3>

        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expense requests available.</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:shadow"
              >
                <div>
                  <p className="text-gray-800 font-medium">{exp.category} - ₹{exp.amount}</p>
                  <p className="text-sm text-gray-500">
                    Status: <span className={`font-semibold ${exp.status === 'approved' ? 'text-green-600' : exp.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                      {exp.status}
                    </span>
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => updateStatus(exp.id, 'approved')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(exp.id, 'rejected')}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
