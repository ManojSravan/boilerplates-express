const asyncHandler = require('express-async-handler');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../services/userService');

const getUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const updatedUser = await updateUser(req.user.userId, req.body);
  res.json(updatedUser);
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  await deleteUser(req.user.userId);
  res.status(204).send();
});

module.exports = {
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};