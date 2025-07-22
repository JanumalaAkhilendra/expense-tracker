import AuditLog from '../models/auditLogModel.js';

export const logAction = async (userId, action, targetId) => {
  await AuditLog.create({
    user_id: userId,
    action,
    target_id: targetId,
    timestamp: new Date()
  });
};