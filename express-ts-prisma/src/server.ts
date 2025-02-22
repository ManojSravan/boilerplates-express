import app from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { prisma } from './config/prisma';

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to database');

    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();