const express = require('express');
const router = express.Router();
const { allProducts, singleProduct } = require('../controllers/product');
const validateObjectId = require('../middlewares/validateObjectId');

router.route('/').get(allProducts);
router.route('/:id').get(validateObjectId, singleProduct);

module.exports = router;
