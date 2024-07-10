import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  // Grab Shipping Address from Redux Store
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAdress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) navigate('/cart');
  }, [cartItems, navigate]);

  // Component base state
  const [address, setAddress] = useState(shippingAdress?.address || '');
  const [city, setCity] = useState(shippingAdress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAdress?.postalCode || '');
  const [country, setCountry] = useState(shippingAdress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='country' className='my-2'>
          <Form.Label>Postal Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
