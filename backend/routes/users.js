const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const _ = require('lodash');
const User = require('../models/user');
const { setAuthCookie } = require('../utils/auth');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc Authe User
// @route POST /api/users/auth
// @access Public
router.post(
  '/auth',
  asyncHandler(async (req, res) => {
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
  })
);

// @desc Register User
// @route GET /api/users
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
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

module.exports = router;
