import app from './app';
import { config } from './config/config';
import { connectDB } from './config/database';
import logger from './utils/logger';

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(config.port, () => {
      logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();