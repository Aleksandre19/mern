import mongoose from 'mongoose';
import Joi from 'joi';
import objectId from 'joi-objectid';
Joi.objectId = objectId(Joi);

const orderItems = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
});

const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const paymentResultSchema = new mongoose.Schema({
  id: { type: String },
  status: { type: String },
  update_time: { type: String },
  email_address: { type: String },
});

const orderSchem = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [orderItems],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: paymentResultSchema,
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const validateOrder = (order) => {
  // Test cases
  // order.orderItems[0]._id = 0;

  const schema = Joi.object({
    orderItems: Joi.array().items(
      Joi.object({
        _id: Joi.objectId(),
        user: Joi.objectId(),
        name: Joi.string(),
        image: Joi.string(),
        category: Joi.string(),
        description: Joi.string(),
        rating: Joi.number(),
        numReviews: Joi.number(),
        price: Joi.number(),
        countInStock: Joi.number(),
        reviews: Joi.array(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        qty: Joi.number(),
        __v: Joi.number().optional(),
      })
    ),
    shippingAddress: Joi.object({
      address: Joi.string(),
      city: Joi.string(),
      postalCode: Joi.string(),
      country: Joi.string(),
    }),

    paymentMethod: Joi.string().required(),
    itemsPrice: Joi.number().required(),
    shippingPrice: Joi.number(),
    taxPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
  });

  return schema.validate(order);
};

const Order = mongoose.model('Order', orderSchem);
export { validateOrder };
export default Order;
