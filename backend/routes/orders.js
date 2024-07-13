import express from 'express';
const router = express.Router();

import Order from '../models/Order.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';
import { validateOrder } from '../models/Order.js';
import { handleDb, handleError } from '../utils/handleDb.js';

// @desc Create order
// @route GET /api/orders
// @access Private
router.post(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    // Validate input
    const { error } = validateOrder(req.body);
    if (error) handleError(error, res);

    // Grab order fields
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Check if order items exist
    if (orderItems && orderItems.length === 0)
      res.status(400).send('No order items');

    // Add product Id to order
    const orderItemsWithProductID = orderItems.map((i) => ({
      ...i,
      product: i._id,
      _id: undefined,
    }));

    // Create new order
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

    const { data, error: creatError } = await handleDb(order.save());

    // Handle server error
    if (creatError) handleError(creatError, res);

    // Send response
    res.status(201).json(data);
  })
);

// @desc Get logged in user orders
// @route GET /api/orders/me
// @access Private
router.get(
  '/me',
  isAuth,
  asyncHandler(async (req, res) => {
    // Find order
    const { data, error } = await handleDb(Order.find({ user: req.user._id }));

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!data) return res.status(404).json('No orders found');

    // Send response
    return res.status(200).json(data);
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
    // Find order
    const { data: order, error } = await handleDb(
      Order.findById(req.params.id).populate('user', 'name email')
    );

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!order) return res.status(404).json('Order not found');

    // Send response
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
    // Find orders
    const { data: orders, error } = await handleDb(
      Order.find({}).populate('user', 'id name')
    );

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!orders) return res.status(404).json('No orders found');

    // Send response
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
    // Find order
    const { data: order, error } = await handleDb(
      Order.findById(req.params.id)
    );

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!order) return res.status(404).json('Order not found');

    // Set up order fields
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    // Update order and handle server error
    const { data: upOrder, error: upError } = await handleDb(order.save());
    if (upError) handleError(upError, res);

    // Send response
    res.status(200).json(upOrder);
  })
);

// @desc Update order to delivered
// @route GET /api/orders/:id/delivered
// @access Private/Admin
router.put(
  '/:id/delivered',
  isAuth,
  isAdmin,
  validateObjectId,
  async (req, res) => {
    // Find order
    const { data: order, error } = await handleDb(
      Order.findById(req.params.id)
    );

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!order) return res.status(404).json('Order not found');

    // Set up order fields
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // Update order and handle server error
    const { data, error: upError } = await handleDb(order.save());
    if (upError) handleError(upError, res);

    // Send response
    res.status(200).json(data);
  }
);

export default router;
