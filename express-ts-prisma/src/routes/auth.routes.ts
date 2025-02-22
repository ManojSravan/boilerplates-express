import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';

export const authRouter = Router();

authRouter.post('/register', validateRequest(registerSchema), authController.register.bind(authController));
authRouter.post('/login', validateRequest(loginSchema), authController.login.bind(authController));