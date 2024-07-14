import mongoose from 'mongoose';
import Joi from 'joi';
import objectId from 'joi-objectid';
Joi.objectId = objectId(Joi);

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: {
      type: [reviewSchema],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const validateProduct = (product) => {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string(),
    price: Joi.number(),
    image: Joi.string(),
    brand: Joi.string(),
    category: Joi.string(),
    countInStock: Joi.number(),
    description: Joi.string(),
  });

  return schema.validate(product);
};

const validateReview = (review) => {
  const schema = Joi.object({
    user: Joi.objectId().required(),
    name: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
  });

  return schema.validate(review);
};

const Product = mongoose.model('Product', productSchema);
export { validateProduct, validateReview };
export default Product;
