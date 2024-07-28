import Category from '../models/category.js';
import Product from '../models/product.js';
import { handleDb, handleError } from '../utils/handleDb.js';

const buildProductQuery = async (req) => {
  const query = {};
  let catName = '';

  // Get category name and set query for it
  const categoryName = req.query.categoryname;
  if (categoryName) {
    const { data: category, error } = await handleDb(
      Category.findOne({ name: categoryName })
    );

    if (error) return handleError(error);
    query.category = category._id;
    catName = category.friendly_name;
  }

  // Get search keyword and set query for it
  const keyword = req.query.keyword;
  if (keyword) query.name = { $regex: req.query.keyword, $options: 'i' };

  // Default sorting option
  let sortBy = { createdAt: -1 };
  // Get sorting keyword
  const sortKeyword = req.query.sort;
  // Sorting options
  const sortOption = {
    name: { name: 1 },
    price: { price: 1 },
    rating: { rating: -1 },
    inStock: { countInStock: -1 },
  };
  // Set sorting option
  if (sortKeyword) sortBy = sortOption[sortKeyword];

  // Count product
  const totalDocuments = await Product.countDocuments(query);

  return {
    query,
    totalDocuments,
    catName,
    sortBy,
  };
};

export default buildProductQuery;
