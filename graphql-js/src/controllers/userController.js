import { users, User } from '../models/User.js';

export const userResolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id)
  },
  Mutation: {
    createUser: (_, { name, email }) => {
      const id = String(users.length + 1);
      const newUser = new User(id, name, email);
      users.push(newUser);
      return newUser;
    }
  }
};