import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema } from '../utils/validationSchemas';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;