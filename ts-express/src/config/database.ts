import mongoose from 'mongoose';
import { config } from './config';
import logger from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri);
    logger.info('MongoDB Connected');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};