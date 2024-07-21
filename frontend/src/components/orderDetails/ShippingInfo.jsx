import { ListGroup } from 'react-bootstrap';
import Message from '../Message';

const ShippingInfo = ({ order, orderPage = true }) => {
  return (
    <ListGroup.Item>
      <h2>Shipping</h2>

      <p>
        <strong>Name: </strong> {order.user.name}
      </p>
      <p>
        <strong>Email: </strong> {order.user.email}
      </p>

      <p>
        <strong>Address: </strong>
        {order.shippingAddress.address},{order.shippingAddress.city},
        {order.shippingAddress.postalCode},{order.shippingAddress.country}
      </p>

      {/* DISPLAY DELIVERY STATUS ONLY ON ORDER PAGE */}
      {orderPage ? (
        order.isDelivered ? (
          <Message variant='success'>Delivered on {order.deliveredAt}</Message>
        ) : (
          <Message variant='danger'>Not Delivered</Message>
        )
      ) : (
        ''
      )}
    </ListGroup.Item>
  );
};

export default ShippingInfo;
