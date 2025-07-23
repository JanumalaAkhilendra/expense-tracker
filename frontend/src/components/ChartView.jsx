import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Title);

const BACKEND_URL = "https://expense-tracker-jw02.onrender.com";

function ChartView() {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${BACKEND_URL}/api/insights/category`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCategoryData(res.data));

    axios.get(`${BACKEND_URL}/api/insights/monthly`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMonthlyData(res.data));
  }, []);

  const categoryChart = {
    labels: categoryData.map(c => c.category),
    datasets: [{
      label: 'Total per Category',
      data: categoryData.map(c => c.total),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderRadius: 8,
    }]
  };

  const monthlyChart = {
    labels: monthlyData.map(m => m.month),
    datasets: [{
      label: 'Monthly Expenses',
      data: monthlyData.map(m => m.total),
      borderColor: 'rgba(153, 102, 255, 0.8)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true
    }]
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Expenses by Category</h3>
        <Bar data={categoryChart} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Monthly Breakdown</h3>
        <Line data={monthlyChart} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
      </div>
    </div>
  );
}

export default ChartView;
