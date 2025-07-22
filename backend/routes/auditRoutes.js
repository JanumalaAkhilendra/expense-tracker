import express from 'express';
import { roleGuard } from '../middlewares/roleMiddleware.js';
import { getAuditLogs } from '../controllers/auditController.js';

const router = express.Router();

router.get('/', roleGuard(['admin']), getAuditLogs);

export default router;