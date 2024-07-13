import express from 'express';
const router = express.Router();
import bcryptjs from 'bcryptjs';
import _ from 'lodash';
import User from '../models/user.js';
import {
  validateAuthUser,
  validateRegUser,
  validateUpdateUser,
} from '../models/user.js';
import { setAuthCookie } from '../utils/auth.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import logger from '../services/logger.js';

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
  validateObjectId,
  asyncHandler(async (req, res) => {
    // Find user
    const user = await User.findById(req.params.id).select('-password');

    // Handle error
    if (!user) return res.status(404).json('User not found');

    // Return user
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

// @desc Update user by user
// @route PUT /api/users/
// @access Private
router.put(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    // Find user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json('User not found');

    // Update user
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();

    // Return update user
    res.status(200).json(updatedUser);
  })
);

// @desc Update user by Admin
// @route PUT /api/users/:id
// @access Private/Admin
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateObjectId,
  asyncHandler(async (req, res) => {
    // Validate input
    const { error } = validateUpdateUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Find user
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json('User not found');

    // Update user
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const { error: updateError } = await user.save();

    // Handle update error
    if (updateError) {
      logger.error(updateError);
      return res.status(400).json('User could not be updated');
    }

    // Send response
    res.status(200).json('User updated successfully');
  })
);

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateObjectId,
  asyncHandler(async (req, res) => {
    // Find user
    const user = await User.findById(req.params.id);

    // Handle errors
    if (!user) return res.status(404).json('User not found');
    if (user.isAdmin) return res.status(400).json('Cannot delete admin');

    // Delete user
    const { error } = await User.deleteOne({ _id: req.params.id });

    // Handle deletion errors
    if (error) {
      logger.error(error);
      return res.status(400).json('User could not be deleted');
    }

    // Send response
    res.status(200).json('User deleted successfully');
  })
);

export default router;
