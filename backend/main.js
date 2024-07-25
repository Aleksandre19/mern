import path from 'path';
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import db from './startup/db.js';
db();

import logger from './startup/logger.js';
logger();

// import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
import products from './routes/products.js';
import users from './routes/users.js';
import orders from './routes/orders.js';
import uploads from './routes/uploads.js';
import categories from './routes/categories.js';

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

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Set production env
if (process.env.NODE_ENV === 'production') {
  // Set __dirname to current directory
  const __dirname = path.resolve();

  // Set upload directory
  app.use('/uploads', express.static('/var/data/uploads'));

  // Set static folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // Any route which is not api will be redirected to main.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  // Set __dirname to current directory
  const __dirname = path.resolve();

  // Set upload directory
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

  // On Development.
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// app.use(notFound);
// app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
