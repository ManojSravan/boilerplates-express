import { body } from 'express-validator';

export const updateUserSchema = [
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('name').optional().isString().withMessage('Name must be a string'),
];