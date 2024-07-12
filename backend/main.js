import path from 'path';
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import db from './startup/db.js';
db();

import logger from './startup/logger.js';
logger();

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
import products from './routes/products.js';
import users from './routes/users.js';
import orders from './routes/orders.js';
import uploads from './routes/uploads.js';

// Set __dirname to current directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/uploads', uploads);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
