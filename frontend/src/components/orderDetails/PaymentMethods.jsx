import { ListGroup } from 'react-bootstrap';
import Message from '../Message';

const PaymentMethods = ({ order, orderPage = true }) => {
  return (
    <ListGroup.Item>
      <h2>Payment Method</h2>

      <p>
        <strong>Method: </strong>
        {order.paymentMethod}
      </p>

      {/* DISPLAY PAID STATUS ONLY ON ORDER PAGE */}
      {orderPage ? (
        order.isPaid ? (
          <Message variant='success'>Paid on {order.paidAt}</Message>
        ) : (
          <Message variant='danger'>Not Paid</Message>
        )
      ) : (
        ''
      )}
    </ListGroup.Item>
  );
};

export default PaymentMethods;
