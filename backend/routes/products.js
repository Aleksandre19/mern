import express from 'express';
const router = express.Router();

import Product from '../models/product.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validateObjectId from '../middlewares/validateObjectId.js';

// @desc Get all products
// @route GET /api/products
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Get product by ID'
// @route GET /api/products/:id
// @access Public
router.get(
  '/:id',
  validateObjectId,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .send('The product with the given ID was not found.');

    res.json(product);
  })
);

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
router.post(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

export default router;
