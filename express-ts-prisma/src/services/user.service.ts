import { prisma } from '../config/prisma';
import { HttpException } from '../utils/exceptions';

export class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    return user;
  }

  async updateUser(id: string, userData: Partial<{ name: string; email: string }>) {
    const user = await prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    });
  }
}