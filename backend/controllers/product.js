const asyncHandler = require('../middlewares/asyncHandler');
const Product = require('../models/product');

// @desc 'Get all Products'
// @route GET /api/v1/products
// @access Public
const allProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// @desc 'Get Single Product'
// @route GET /api/v1/products
// @access Public
const singleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

module.exports = {
  allProducts,
  singleProduct,
};
