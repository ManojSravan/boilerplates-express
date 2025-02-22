const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../services/userService');

const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, name });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    token,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    token,
  });
});

module.exports = {
  register,
  login,
};