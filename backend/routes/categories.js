import express from 'express';
const router = express.Router();

import Category from '../models/category.js';
import { handleDb, handleError } from '../utils/handleDb.js';

// @desc Get all categories
// @route GET /api/categories
// @access Public
router.get('/', async (req, res) => {
  const { data: categories, error } = await handleDb(Category.find({}));

  if (error) return handleError(error);

  res.status(200).send(categories);
});

export default router;
