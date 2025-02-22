import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/exceptions';
import { logger } from '../utils/logger';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

  res.status(status).json({
    status,
    message,
  });
};