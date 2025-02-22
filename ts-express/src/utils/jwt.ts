import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: '30d',
  });
};