const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const users = require('./users');
const products = require('./products');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
require('../startup/db')();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
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
