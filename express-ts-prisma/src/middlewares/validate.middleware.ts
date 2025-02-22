import { Request, Response, NextFunction } from 'express';
import { Schema } from 'express-validator';
import { validationResult } from 'express-validator';

export const validateRequest = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schema.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};