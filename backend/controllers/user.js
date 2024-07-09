const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/asyncHandler');
const { setAuthCookie } = require('../utils/auth');
const User = require('../models/user');

// @desc Authe User & get toke
// @route POST /api/users/login
// @access Public
const auth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Needs to be done Joi validation

  // Validate email
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Invalid email or password');

  // Validate passwor
  const validPassword = await bcryptjs.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalide email or password.');

  // Generate Token and set it in HTTP-Only cookie
  const token = user.generateAuthToken();
  setAuthCookie(res, token);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  //  res.send('Auth user');
});

// @desc Register User
// @route GET /api/users
// @access Public
const register = asyncHandler(async (req, res) => {
  res.send('Register user');
});

// @desc Logout User / Clear cookie
// @route POST /api/users/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  res.send('Logout user');
});

// @desc Get user profile
// @route GET /api/user/profile
// @access Private
const getProfile = asyncHandler(async (req, res) => {
  res.send('Get user profile');
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  res.send('Update user profile');
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const allUsers = asyncHandler(async (req, res) => {
  res.send('Get all users for admin');
});

// @desc Get users by Id
// @route GET /api/users/:id
// @access Private/Admin
const userById = asyncHandler(async (req, res) => {
  res.send('Get user by ID');
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete user');
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('Update user');
});

module.exports = {
  auth,
  register,
  logout,
  getProfile,
  updateProfile,
  allUsers,
  userById,
  deleteUser,
  updateUser,
};
