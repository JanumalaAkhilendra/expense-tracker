import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.POSTGRES_URL;
if (!dbUrl) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Postgres DB connected');
  } catch (err) {
    console.error('Unable to connect to DB:', err);
    process.exit(1);
  }
};