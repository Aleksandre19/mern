import { ListGroup } from 'react-bootstrap';
import Message from '../Message';
const ShippingInfo = ({ order }) => {
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
      {order.isDelivered ? (
        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
      ) : (
        <Message variant='danger'>Not Delivered</Message>
      )}
    </ListGroup.Item>
  );
};

export default ShippingInfo;
