import { body } from 'express-validator';

export const registerSchema = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name').optional().isString().withMessage('Name must be a string'),
];

export const loginSchema = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password is required'),
];