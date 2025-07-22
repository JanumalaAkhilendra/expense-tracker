import Expense from '../models/expenseModel.js';
import { logAction } from '../utils/logger.js';

// Add a new expense
export const addExpense = async (req, res) => {
  const { amount, category, date, notes } = req.body;
  try {
    const newExpense = await Expense.create({
      user_id: req.user.id,
      amount,
      category,
      date,
      notes,
      status: 'pending'
    });
    logAction(req.user.id, 'CREATE_EXPENSE', newExpense.id);
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add expense' });
  }
};

// Get expenses for the logged-in user
export const getOwnExpenses = async (req, res) => {
  try {
    const userExpenses = await Expense.findAll({ where: { user_id: req.user.id } });
    res.json(userExpenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

// Get all expenses (admin)
export const getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await Expense.findAll();
    res.json(allExpenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

// Update expense status (admin)
export const updateExpenseStatus = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    expense.status = req.body.status;
    await expense.save();
    logAction(req.user.id, 'UPDATE_EXPENSE_STATUS', expense.id);
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update expense status' });
  }
};