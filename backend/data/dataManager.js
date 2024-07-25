import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';
import users from './users.js';
import newProducts from './newProducts.js';
import User from '../models/user.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import db from '../startup/db.js';
db();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = newProducts.map((product) => {
      return {
        ...product,
        category: new mongoose.Types.ObjectId(product.category),
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported'.green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit();
  }
};

const deleteDate = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    console.error(`Data Deleted`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteDate();
} else {
  importData();
}
