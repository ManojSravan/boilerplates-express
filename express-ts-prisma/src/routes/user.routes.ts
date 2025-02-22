import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { updateUserSchema } from '../validators/user.validator';

export const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', userController.getUsers.bind(userController));
userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.patch('/:id', validateRequest(updateUserSchema), userController.updateUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));