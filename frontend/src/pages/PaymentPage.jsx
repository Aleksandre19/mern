import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import usePamentPage from '../hooks/usePaymentPage';

const PaymentPage = () => {
  // Custom hook
  const { setPaymentMethod, submitHandler } = usePamentPage();

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'> Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
