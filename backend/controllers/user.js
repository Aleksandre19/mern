const bcryptjs = require('bcryptjs');
const _ = require('lodash');
const asyncHandler = require('../middlewares/asyncHandler');
const { setAuthCookie } = require('../utils/auth');
const User = require('../models/user');

// @desc Authe User & get toke
// @route POST /api/users/login
// @access Public
const auth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Needs to be done Joi validation
  if (!email || !password) return res.status(400).json('Invalid email or password');

  // Validate email
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json('Invalid email or password');

  // Validate passwor
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) return res.status(400).json('Invalide email or password.');

  // Generate Token and store it in HTTP-Only cookie
  const token = user.generateAuthToken();
  setAuthCookie(res, token);

  // Return user
  res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

// @desc Register User
// @route GET /api/users
// @access Public
const register = asyncHandler(async (req, res) => {
  // !!! Needs to be add Joi validation

  // Check if user exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json('User already exists');

  // Create user
  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
  await user.save();

  // Generate Token and store it in HTTP-Only cookie
  const token = user.generateAuthToken();
  setAuthCookie(res, token);

  res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

// @desc Logout User / Clear cookie
// @route POST /api/users/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('mern_jwt');

  res.status(200).json('User is logged out');
});

// @desc Get user profile
// @route GET /api/user/profile
// @access Private
const getProfile = asyncHandler(async (req, res) => {
  // Check if user exists
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json('User not found');

  // Return user
  res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  // !!! Needs Joi Validation

  // Check if user exists
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json('User not found');

  // Update user
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  await user.save();

  // Return user
  res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
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
