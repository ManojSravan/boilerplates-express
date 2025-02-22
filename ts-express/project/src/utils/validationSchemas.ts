import { body } from 'express-validator';

export const registerSchema = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Please provide a name'),
];

export const loginSchema = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Please provide a password'),
];