// const express = require('express');
// const router = express.Router();
// const {
//   addOrder,
//   getMyOrders,
//   getOrderById,
//   updateOrderToPaied,
//   updateOrderToDelivered,
//   getOrders,
// } = require('../controllers/order');
// const validateObjectId = require('../middlewares/validateObjectId');
// const { isAuth, isAdmin } = require('../middlewares/auth');

// router.route('/').post(isAuth, addOrder).get(isAuth, isAdmin, getOrders);
// router.route('/mine').get(isAuth, getMyOrders);
// router.route('/:id').get(isAuth, isAdmin, validateObjectId, getOrderById);
// router.route('/:id/pay').put(isAuth, validateObjectId, updateOrderToPaied);
// router
//   .route('/:id/deliver')
//   .put(isAuth, isAdmin, validateObjectId, updateOrderToDelivered);

// module.exports = router;
