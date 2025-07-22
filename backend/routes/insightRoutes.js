import express from 'express';
import { roleGuard } from '../middlewares/roleMiddleware.js';
import { categoryInsights, monthlyInsights } from '../controllers/insightController.js';

const router = express.Router();

router.get('/category', roleGuard(['admin']), categoryInsights);
router.get('/monthly', roleGuard(['admin']), monthlyInsights);

export default router;