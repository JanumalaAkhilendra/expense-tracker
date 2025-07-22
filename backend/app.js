import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import insightRoutes from './routes/insightRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import { verifyToken } from './middlewares/authMiddleware.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health check route
app.get('/', (req, res) => {
  res.send('Expense Tracker Backend is running');
});

// Public route
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/expenses', verifyToken, expenseRoutes);
app.use('/api/insights', verifyToken, insightRoutes);
app.use('/api/audit-logs', verifyToken, auditRoutes);

export default app;