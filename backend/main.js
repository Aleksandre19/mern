import express from 'express';

import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import db from './startup/db.js';
db();

import logger from './startup/logger.js';
logger();

const app = express();
import products from './routes/products.js';
import users from './routes/users.js';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/products', products);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
