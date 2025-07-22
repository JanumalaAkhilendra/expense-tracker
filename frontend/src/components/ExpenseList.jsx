import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div className="bg-white p-6 mt-6 rounded-2xl shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {expenses.map((e) => (
            <li
              key={e.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border hover:shadow transition"
            >
              <div>
                <p className="font-medium text-gray-800">{e.category}</p>
                <p className="text-sm text-gray-500">{new Date(e.date).toLocaleDateString()}</p>
              </div>
              <span className="text-indigo-600 font-semibold text-lg">₹{e.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
