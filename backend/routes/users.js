import express from 'express';
const router = express.Router();
import bcryptjs from 'bcryptjs';
import _ from 'lodash';
import User from '../models/user.js';
import { validateAuthUser, validateRegUser } from '../models/user.js';
import { setAuthCookie } from '../utils/auth.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
router.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
  })
);

// @desc Get user by Id
// @route GET /api/users/:id
// @access Private/Admin
router.get(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json('User not found');
    res.status(200).json(user);
  })
);

// @desc Authe User
// @route POST /api/users/auth
// @access Public
router.post(
  '/auth',
  asyncHandler(async (req, res) => {
    // Validate user
    const { error } = validateAuthUser(req.body);
    if (error) return res.status(400).json('Invalid email or password');

    // Unpack users credentials
    const { email, password } = req.body;

    // Validate email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json('Invalid email or password');

    // Validate passwor
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json('Invalide email or password.');

    // Generate Token and store it in HTTP-Only cookie
    const token = user.generateAuthToken();
    setAuthCookie(res, token);

    // Return user
    res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
  })
);

// @desc Register User
// @route GET /api/users
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    // Validate user
    const { error } = validateRegUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);

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
  })
);

// @desc Logout User / Clear cookie
// @route POST /api/users/logout
// @access Private
router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    res.clearCookie('mern_jwt');

    res.status(200).json('User is logged out');
  })
);

// @desc Update user
// @route PUT /api/users/
// @access Private
router.put(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json('User not found');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  })
);

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
router.put(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json('User not found');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  })
);

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json('User not found');
    if (user.isAdmin) return res.status(400).json('Cannot delete admin');

    await User.deleteOne({ _id: req.params.id });
    res.status(200).send('User deleted successfully');
  })
);

export default router;
