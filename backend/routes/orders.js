import express from 'express';
const router = express.Router();

import Order from '../models/Order.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';

// @desc Create order
// @route GET /api/orders
// @access Private
router.post(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0)
      res.status(400).send('No order items');

    const orderItemsWithProductID = orderItems.map((i) => ({
      ...i,
      product: i._id,
      _id: undefined,
    }));

    const order = new Order({
      user: req.user._id,
      orderItems: orderItemsWithProductID,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  })
);

// @desc Get logged in user orders
// @route GET /api/orders/me
// @access Private
router.get(
  '/me',
  isAuth,
  asyncHandler(async (req, res) => {
    const myOrders = await Order.find({ user: req.user._id });
    if (!myOrders) return res.status(404).json('No orders found');
    return res.status(200).json(myOrders);
  })
);

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
router.get(
  '/:id',
  isAuth,
  validateObjectId,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (!order) return res.status(404).json('Order not found');
    res.status(200).json(order);
  })
);

// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin
router.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    if (!orders) return res.status(404).json('No orders found');
    res.status(200).json(orders);
  })
);

// @desc Update order
// @route PUT /api/orders/:id
// @access Private
router.put(
  '/:id',
  isAuth,
  validateObjectId,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json('Order not found');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
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
