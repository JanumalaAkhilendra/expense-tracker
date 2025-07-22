import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

export const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false },
  target_id: { type: DataTypes.INTEGER },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default AuditLog;