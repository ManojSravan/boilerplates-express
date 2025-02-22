import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { config } from '../config';
import { CreateUserDto } from '../dtos/user.dto';
import { HttpException } from '../utils/exceptions';

export class AuthService {
  async register(userData: CreateUserDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new HttpException(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const token = this.generateToken(user.id);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(401, 'Invalid credentials');
    }

    const token = this.generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1d' });
  }
}