import mongoose from 'mongoose';
const db = process.env.MONGODB_URI;

export default async () => {
  await mongoose
    .connect(db)
    .then(() => console.log(`Connected to the MongoDB...`))
    .catch((err) => console.error(`Could not connect to the MongoDB...`, err));
};
