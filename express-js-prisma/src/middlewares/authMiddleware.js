const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { getUserById } = require('../services/userService');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await getUserById(decoded.userId);
      if (!user) {
        res.status(401);
        throw new Error('Not authorized');
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = asyncHandler(async (req, res, next) => {
  const user = await getUserById(req.user.userId);
  
  if (user && user.role === 'ADMIN') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
});

module.exports = { protect, admin };