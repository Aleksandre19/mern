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

  const totalDocuments = await Product.countDocuments({ ...keyword });

  return {
    query,
    totalDocuments,
    catName,
  };
};

export default buildProductQuery;
