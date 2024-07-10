import express from 'express';
const router = express.Router();

import asyncHandler from '../middlewares/asyncHandler.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';

// @desc Create order
// @route GET /api/orders
// @access Private
// prettier-ignore
router.post('/', isAuth, asyncHandler(async (req, res) => {
    res.send('Create order'); 
}));

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
router.get(
  '/:id',
  isAuth,
  isAdmin,
  validateObjectId,
  asyncHandler(async (req, res) => {
    res.send('Get order by id');
  })
);

// @desc Get all orders
// @route GET /api/orders/:id
// @access Private
router.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    res.send('Get all orders');
  })
);

// @desc Update order
// @route GET /api/orders/:id
// @access Private
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateObjectId,
  asyncHandler(async (req, res) => {
    res.send('Get order by id');
  })
);

// @desc Update order
// @route GET /api/orders/:id
// @access Private
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateObjectId,
  asyncHandler(async (req, res) => {
    res.send('Get order by id');
  })
);

export default router;
