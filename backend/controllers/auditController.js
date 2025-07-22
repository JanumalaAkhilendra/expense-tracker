import AuditLog from '../models/auditLogModel.js';

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch audit logs' });
  }
};
