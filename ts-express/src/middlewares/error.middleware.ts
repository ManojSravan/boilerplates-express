import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import logger from '../utils/logger';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.nodeEnv === 'development') {
    logger.error('Error 🔥', err);
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    logger.error('Error 🔥', err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};