const asyncHandler = require('express-async-handler');
const userService = require('../services/user.service');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await userService.createUser({ username, email, password });
  res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticateUser(email, password);
  res.json(user);
});

const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};