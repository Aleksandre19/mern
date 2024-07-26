import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/general/Loader';
import FormContainer from '../../components/general/FormContainer';
import useProductEditPage from '../../hooks/admin/useProductEditPage';
import ErrorHandler from '../../components/general/ErrorHandler';

const ProductEditPage = () => {
  // Component based state
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    submitHandler,
    uploadImageHandler,
    categories,
    productLoading,
    updateLoading,
    uploadLoading,
    categoriesIsLoading,
    productError,
    categoriesError,
  } = useProductEditPage(
    name,
    setName,
    price,
    setPrice,
    image,
    setImage,
    category,
    setCategory,
    countInStock,
    setCountInStock,
    description,
    setDescription
  );

  // Handle loading
  if (productLoading || updateLoading || uploadLoading || categoriesIsLoading)
    return <Loader />;

  if (productError) return ErrorHandler(productError);

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-2' controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image' className='my-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image'
              value={image}
              onChange={() => setImage}
            ></Form.Control>

            <Form.Control
              type='file'
              label='Choose file'
              onChange={uploadImageHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-2' controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Count In Stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-2' controlId='category'>
            <Form.Label>Category</Form.Label>
            {categoriesError && ErrorHandler(categoriesError)}
            <Form.Select
              value={category._id}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.friendly_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-2' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-4'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
