const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const createUser = async (userData) => {
  const user = await User.create(userData);
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  }
  
  throw new Error('Invalid email or password');
};

module.exports = {
  createUser,
  authenticateUser,
};