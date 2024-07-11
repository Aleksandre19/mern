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

// @desc    Update a products
// @route   PUT /api/products/:id
// @access  Ptivate/Admin
router.put(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('Product not found.');

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  })
);

export default router;
