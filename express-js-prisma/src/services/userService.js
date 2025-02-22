const prisma = require("../config/prisma");

const createUser = async (userData) => {
  return await prisma.user.create({
    data: {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: 'USER'
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
};

const updateUser = async (id, userData) => {
  return await prisma.user.update({
    where: { id },
    data: userData,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
};

const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id }
  });
  return true;
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
