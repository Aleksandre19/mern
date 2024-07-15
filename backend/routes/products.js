import express from 'express';
const router = express.Router();
import _ from 'lodash';
import Product from '../models/product.js';
import { isAuth, isAdmin } from '../middlewares/auth.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import { validateProduct, validateReview } from '../models/product.js';
import { handleDb, handleError } from '../utils/handleDb.js';

// @desc Get all products
// @route GET /api/products
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    // Pagination parameters
    const pageSize = process.env.PAGINATION_LIMIT || 8;
    const page = Number(req.query.pageNumber) || 1;

    // ket search keyword
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const totalDocuments = await Product.countDocuments({ ...keyword });

    // Get products
    const { data: products, error } = await handleDb(
      Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    );

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!products) return res.status(404).json('Products not found');

    // Send response
    res.json({ products, page, pages: Math.ceil(totalDocuments / pageSize) });
  })
);

// @desc Get top products
// @route GET /api/products/top
// @access Public
router.get(
  '/top',
  asyncHandler(async (req, res) => {
    // Find top three products
    const { data, error } = await handleDb(
      Product.find({}).sort({ rating: -1 }).limit(3)
    );

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!data) return res.status(404).json('Products not found');

    // Send response
    res.status(200).json(data);
  })
);

// @desc Get product by Id
// @route GET /api/products/:id
// @access Public
router.get(
  '/:id',
  validateObjectId,
  asyncHandler(async (req, res) => {
    // Find product
    const { data, error } = await handleDb(Product.findById(req.params.id));

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!data) return res.status(404).json('Product not found');

    // Send response
    res.json(data);
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
    // Products dummy data
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

    // Create product
    const { data, error } = await handleDb(product.save());

    // Handle server and notfound errors
    if (error) handleError(error, res);
    if (!data) return res.status(404).json('Product not found');

    // Send response
    res.status(201).json('Product created successfully');
  })
);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Ptivate/Admin
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateObjectId,
  asyncHandler(async (req, res) => {
    // Validate input
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Pick product fileds from requesr body
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    // Find product
    const { data: product, error: productError } = await handleDb(
      Product.findById(req.params.id)
    );

    // Handle server and not found errors
    if (productError) handleError(productError, res);
    if (!product) return res.status(404).send('Product not found.');

    // Set product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    // Update product
    const { data: upProduct, error: upError } = await handleDb(product.save());

    // Handle server error
    if (upError) handleError(upError, res);

    // Send response
    res.status(200).json(upProduct);
  })
);

// @desc    Delete a products
// @route   DELETE /api/products/:id
// @access  Ptivate/Admin
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateObjectId,
  asyncHandler(async (req, res) => {
    // Find product
    const { data: product, error } = await handleDb(
      Product.findById(req.params.id)
    );

    // Handle server and not found errors
    if (error) handleError(error, res);
    if (!product) return res.status(404).send('Product not found.');

    // Delete product
    const { deleteError } = await handleDb(
      Product.deleteOne({ _id: product._id })
    );

    // Handle server error
    if (deleteError) handleError(deleteError, res);

    // Send response
    res.status(200).json('product deleted successfully');
  })
);

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
// @access  Ptivate
router.post(
  '/:id/reviews',
  isAuth,
  validateObjectId,
  asyncHandler(async (req, res) => {
    // Validate input
    const { error } = validateReview(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Destructure request body
    const { rating, comment } = req.body;

    // Find product
    const { data: product, error: productError } = await handleDb(
      Product.findById(req.params.id)
    );

    // Handle server and not found errors
    if (productError) handleError(productError, res);
    if (!product) return res.status(404).json('Product not found.');

    // Check if user has already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    // If reviewed, return response
    if (alreadyReviewed)
      return res.status(400).json('You have already reviewed this product');

    // Create new review
    const newReview = {
      name: req.user.name,
      rating: rating,
      comment: comment,
      user: req.user._id,
    };

    // Add review to product
    product.reviews.push(newReview);

    // Increment product reviews count
    product.numReviews = product.reviews.length;

    // Calculate rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // Update product and handle server error
    const { updateError } = await handleDb(product.save());
    if (updateError) handleError(updateError, res);

    // Send response
    res.status(200).json('Review added successfully');
  })
);

export default router;
