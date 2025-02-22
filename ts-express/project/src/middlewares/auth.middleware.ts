import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { AppError } from '../utils/appError';
import { User } from '../models/User';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('You are not logged in', 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Not authorized', 401));
  }
};