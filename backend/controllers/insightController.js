import Expense from '../models/expenseModel.js';

export const categoryInsights = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { status: 'approved' } });
    const result = {};
    expenses.forEach(e => {
      result[e.category] = (result[e.category] || 0) + parseFloat(e.amount);
    });
    const data = Object.keys(result).map(key => ({ category: key, total: result[key] }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch category insights' });
  }
};

export const monthlyInsights = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { status: 'approved' } });
    const result = {};
    expenses.forEach(e => {
      const month = new Date(e.date).toISOString().slice(0, 7);
      result[month] = (result[month] || 0) + parseFloat(e.amount);
    });
    const data = Object.keys(result).map(key => ({ month: key, total: result[key] }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch monthly insights' });
  }
};