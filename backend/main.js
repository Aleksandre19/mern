import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products.js';

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
