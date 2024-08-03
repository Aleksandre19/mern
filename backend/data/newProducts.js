import products from './new_products.json' assert { type: 'json' };
// import fs from 'fs/promises';
// import path from 'path';

// Generate random number
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Mapping categories old ids to new ObjectId
const categories = {
  1: '66a2d715bf8f02b1da003cb7',
  2: '66a2d715bf8f02b1da003cb8',
  3: '66a2d715bf8f02b1da003cb9',
  4: '66a2d715bf8f02b1da003cba',
  5: '66a2d715bf8f02b1da003cbb',
  6: '66a2d715bf8f02b1da003cbc',
  7: '66a2d715bf8f02b1da003cbd',
  8: '66a2d715bf8f02b1da003cbe',
  9: '66a2d715bf8f02b1da003cbf',
};

// Array for stroring final result
const newProducts = [];

// Looping through products array and restructuring data
products.forEach((product) => {
  // Excluding sku and image_url.
  // Grabbing category and image for restructuring.
  const { sku, brand, category, image_url, image, ...remaining } =
    product.fields;

  // Creating neccessary fields for new product.
  const newCategory = categories[category].trim();
  const new_image = `/images/${image}`;
  const numReviews = 0;
  const countInStock = randomNumber(5, 30);

  // Creating new product object.
  const new_data = {
    ...remaining,
    category: newCategory,
    reviews: [],
    image: new_image,
    numReviews,
    countInStock,
  };

  // Pushing new product object to array.
  newProducts.push(new_data);
});

// This is a just an example for exporting data to file
// for debuging purpose.

// const exportData = async () => {
//   const outputPath = path.join(process.cwd(), 'output', 'newProducts.json');

//   try {
//     // Ensure the output directory exists
//     await fs.mkdir(path.dirname(outputPath), { recursive: true });

//     // Write the data to the file
//     await fs.writeFile(outputPath, JSON.stringify(newProducts, null, 2));
//     console.log(`Data successfully written to ${outputPath}`);
//   } catch (error) {
//     console.error('Error writing data to file:', error);
//   }
// };

// exportData();

export default newProducts;
