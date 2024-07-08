const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const validateObjectId = require('../middlewares/validateObjectId');
const Products = require('../models/product');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.send(products);
  })
);

router.get(
  '/:id',
  validateObjectId,
  asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .send('The product with the given ID was not found.');

    res.send(product);
  })
);

module.exports = router;
