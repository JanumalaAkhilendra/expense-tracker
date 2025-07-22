import express from 'express';
import { roleGuard } from '../middlewares/roleMiddleware.js';
import { addExpense, getOwnExpenses, getAllExpenses, updateExpenseStatus } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', roleGuard(['employee']), addExpense);
router.get('/mine', roleGuard(['employee']), getOwnExpenses);
router.get('/', roleGuard(['admin']), getAllExpenses);
router.patch('/:id/status', roleGuard(['admin']), updateExpenseStatus);

export default router;
