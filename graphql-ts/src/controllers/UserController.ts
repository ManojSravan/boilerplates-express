import { User, UserModel } from '../models/User';

export interface ResolverContext {
  // Add any context properties here
}

export const userResolvers = {
  Query: {
    users: (): User[] => {
      return UserModel.findAll();
    },
    user: (_: unknown, { id }: { id: string }): User | undefined => {
      return UserModel.findById(id);
    },
  },
  Mutation: {
    createUser: (
      _: unknown,
      { input }: { input: { username: string; email: string } },
    ): User => {
      return UserModel.create(input);
    },
  },
};