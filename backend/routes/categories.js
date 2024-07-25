import express from 'express';
const router = express.Router();

import Category from '../models/category.js';

// @desc Get all categories
// @route GET /api/categories
// @access Public
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;
