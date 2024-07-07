const express = require('express');
const dotenv = require('dotenv');

require('dotenv').config();
require('./startup/db.js')();
const products = require('./data/products.js');

const app = express();

app.use(express.json());

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.send(product);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
