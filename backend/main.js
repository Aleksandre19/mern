const express = require('express');

require('dotenv').config();
require('./startup/db.js')();
require('./startup/logger')();

const app = express();
const products = require('./routes/products.js');

app.use(express.json());
app.use('/api/products', products);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
