import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/general/FormContainer';
import CheckoutSteps from '../components/general/CheckoutSteps';
import useShipping from '../hooks/useShipping';

const ShippingPage = () => {
  const {
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    country,
    setCountry,
    submitHandler,
  } = useShipping();

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
