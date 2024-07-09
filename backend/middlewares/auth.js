const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/user');

const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.mern_jwt;
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.MERN_JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
});

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(401).send('Access denied. User is not an admin.');
  next();
};

module.exports = { isAdmin, isAuth };
