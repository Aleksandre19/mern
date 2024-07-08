const express = require('express');

require('dotenv').config();
require('./startup/db.js')();
require('./startup/logger')();

const app = express();
const products = require('./routes/products.js');
const users = require('./routes/users.js');

app.use(express.json());
app.use('/api/products', products);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
