import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/user.dto';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;
      const { user, token } = await this.authService.register(userData);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController(new AuthService());