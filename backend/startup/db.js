const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

module.exports = async () => {
  await mongoose
    .connect(db)
    .then(() => console.log(`Connected to the MongoDB...`))
    .catch((err) => console.error(`Could not connect to the MongoDB...`, err));
};
