export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

// In-memory database
export const users: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    createdAt: new Date(),
  },
];

export class UserModel {
  static findAll(): User[] {
    return users;
  }

  static findById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  static create(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      id: String(users.length + 1),
      ...userData,
      createdAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  }
}