import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development',
};