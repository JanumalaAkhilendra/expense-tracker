import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

export const Expense = sequelize.define('Expense', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  notes: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
});

export default Expense;