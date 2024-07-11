import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from '../../slices/product';

const ProductEditPage = () => {
  // Product Id
  const { id: prodyctId } = useParams();
  const navigate = useNavigate();

  // Component based state
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  // Product by Id
  const {
    data: product,
    isLoading: productLoading,
    refetch,
    error: productError,
  } = useGetProductDetailsQuery(prodyctId);

  // Update product endpoint
  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();

  // Update state
  useEffect(() => {
    if (!product) return;
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }, [product]);

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Product structure for updating
    const updatedProduct = {
      _id: prodyctId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    // Update product request
    const result = await updateProduct(updatedProduct);

    // Handle error
    if (result.error)
      return toast.error(
        result.error?.data ||
          result.error?.data?.message ||
          result.error.message ||
          'Authentication error'
      );

    // Handle success
    toast.success('Product updated successfully');
    navigate('/admin/productlist');
  };

  // Handle loading
  if (productLoading || updateLoading) return <Loader />;

  // Handle error
  if (productError)
    return toast.error(
      productError?.data ||
        productError?.data?.message ||
        productError.message ||
        'Could not fetch product'
    );

  // Handle error
  if (updateError)
    return toast.error(
      updateError?.data ||
        updateError?.data?.message ||
        updateError.message ||
        'Could not update product'
    );

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

          {/* IMAGE UNPUT PLACE HOLDER */}
          <Form.Group className='mb-2' controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
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
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
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
