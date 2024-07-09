const asyncHandler = require('../middlewares/asyncHandler');
const Order = require('../models/order');

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrder = asyncHandler(async (req, res) => {
  res.send('Add order items');
});

// @desc Get loged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('Get my orders');
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send('Get order by ID');
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private/Admin
const updateOrderToPaied = asyncHandler(async (req, res) => {
  res.send('Update order to paid');
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update order to delivered');
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('Update order to delivered');
});

module.exports = {
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaied,
  updateOrderToDelivered,
  getOrders,
};
